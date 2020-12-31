import mongoose from 'mongoose';
import geocoder from "../utils/geocoder.js";

const VehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'Please add vehicle make']
    },
    model: {
        type: String,
        required: [true, 'Please add vehicle model']
    },
    year: {
        type: Number,
        required: [true, 'Please add vehicle year']
    },
    description: {
        type: String,
        maxlength: [200, 'Description cannot be more than 300 words']
    },
    category: {
      type: String,
      enum: ['automobile', 'motorcycle', 'boat', 'jetski'],
      default: 'automobile'
    },
    features: {type: [{type: String, trim: true}]},
    freecancelation: {
        type: Boolean,
        default: true
    },
    distance: {
        type: Number,
        default: 600
    },
    cost: {
        type: Number,
        required: [true, 'Please add price for vehicle']
    },
    volume: String,
    doors: {
        type: Number,
        default: 0
    },
    seats: {
        type: Number,
        default: 2
    },
    fuel_type: {
        type: String,
        enum: ['gasoline', 'diesel', 'electric'],
        default: 'gasoline'
    },
    transmission: {
        type: String,
        enum: ['manual', 'automatic'],
        default: 'manual'
    },
    address: {
        type: String,
        required: [true, 'Please add vehicle address']
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must can not be more than 5']
    },
    images: {
        type:[String]
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
        countryCode: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    book_date: Date,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Geocode & create location field
VehicleSchema.pre('save', async function (next) {
    if (!this.isModified('address')) {
        next();
    }
    if (this.address === null || this.address === undefined) {
        next();
    }
    const loc = await geocoder.geocode(this.address);
    if (loc.length === 0) {
        next();
    }
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].extra.neighborhood,
        city: loc[0].administrativeLevels.level2long,
        state: loc[0].administrativeLevels.level1long,
        zipcode: loc[0].zipcode,
        country: loc[0].country,
        countryCode: loc[0].countryCode
    };

    // Do not save address in DB
    this.address = undefined;
    next();
});

export default mongoose.model('Vehicle', VehicleSchema);
