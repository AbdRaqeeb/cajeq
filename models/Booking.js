import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true
    },
    vehicle: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'canceled', 'finished', 'rejected'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    extra_cost: Number,
    start_date: {
        type: Date,
        default: Date.now() + 10 * 60 * 1000,
        required: [true, 'Please add a start date for the booking']
    },
    end_date: {
        type: Date,
        required: [true, 'Please add an end date for the booking']
    },
    pick_up: {
        type: String,
        required: [true, 'Please add pick up location']
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    }
});

export default mongoose.model('Booking', BookingSchema);

