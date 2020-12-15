import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxlength: 100
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 5']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});


//Static method to get avg rating and save
RatingSchema.statics.getUserAverageRating = async function(userId) {
    const obj = await this.aggregate([
        {
            $match: { user: userId }
        },
        {
            $group: {
                _id: '$user',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        await this.model('User').findByIdAndUpdate(userId, {
            averageRating: obj[0].averageRating
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageCost after save
RatingSchema.post('save', async function() {
    await this.constructor.getUserAverageRating(this.user);
});

// Call getAverageCost before remove
RatingSchema.post('remove', async function() {
    await this.constructor.getUserAverageRating(this.user);
});

export default mongoose.model('Rating', RatingSchema);