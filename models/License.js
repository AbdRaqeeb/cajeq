import mongoose from 'mongoose';

const LicenseSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'Please add license']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('License', LicenseSchema);