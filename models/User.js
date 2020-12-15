import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Please add a unique username'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ]
        },
        phone: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
            select: false,
        },
        about: String,
        image: String,
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating must can not be more than 5']
        },
        driveManual: {
            type: Boolean,
            default: true
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        confirmEmailToken: String,
        isEmailConfirmed: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

// Reverse populate with virtuals
UserSchema.virtual('license', {
    ref: 'License',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

// Cascade delete vehicles when a user is deleted
UserSchema.pre('remove', async function(next) {
    console.log(`Vehicles being removed from user ${this._id}`);
    await this.model('Vehicle').deleteMany({ user: this._id });
    next();
});


// Encrypt password before saving to database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign jwt and returns
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Generate email confirm token
UserSchema.methods.generateEmailConfirmToken = function (next) {
    // email confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');

    // set confirmEmailToken
    this.confirmEmailToken = crypto.createHash('sha256').update(confirmationToken).digest('hex');

    const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
    return `${confirmationToken}.${confirmTokenExtend}`;
};


export default mongoose.model('User', UserSchema);