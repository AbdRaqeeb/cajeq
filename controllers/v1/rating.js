import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../utils/errorResponse.js';

// models
import User from '../../models/User.js';
import Rating from "../../models/Rating.js";

/**
 * @desc    Get ratings
 * @route   GET /api/v1/ratings
 * @route   GET /api/v1/users/:userId/ratings
 * @access  Public
 * */
export const getRatings = asyncHandler(async (req, res, next) => {
    if (req.params.userId) {
        const ratings = await Rating.find({user: req.params.userId});

        return res.status(200).json({
            success: true,
            count: ratings.length,
            data: ratings
        });
    }
    res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single rating
 * @route   GET /api/v1/ratings/:id
 * @access  Public
 * */
export const getRating = asyncHandler(async (req, res, next) => {
    const rating = await Rating.findById(req.params.id)
        .populate({
            path: 'user host',
            select: 'name email phone'
        });

    if (!rating) {
        return next(
            new ErrorResponse(`No rating found with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: rating
    });
});

/**
 * @desc    Add rating
 * @route   POST /api/v1/users/:userId/ratings
 * @access  Private
 * */
export const addRating = asyncHandler(async (req, res, next) => {
    req.body.user = req.params.userId;
    req.body.host = req.user.id;

    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(
            new ErrorResponse(
                `No user with the id of ${req.params.userId}`,
                404
            )
        );
    }

    const rating = await Rating.create(req.body);

    const details = await getDetails(rating._id);

    res.status(201).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update rating
 * @route   PUT /api/v1/ratings/:id
 * @access  Private
 * */
export const updateRating = asyncHandler(async (req, res, next) => {
    let rating = await Rating.findById(req.params.id);

    if (!rating) {
        return next(
            new ErrorResponse(`No rating with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure rating belongs to user or user is admin
    if (rating.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update rating`, 401));
    }

    rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    rating.save();

    const details = await getDetails(req.params.id)

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Delete rating
 * @route   DELETE /api/v1/ratings/:id
 * @access  Private
 * */
export const deleteRating = asyncHandler(async (req, res, next) => {
    const rating = await Rating.findById(req.params.id);

    if (!rating) {
        return next(
            new ErrorResponse(`No rating with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure rating belongs to user or user is admin
    if (rating.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update rating`, 401));
    }

    await rating.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// get booking details function
const getDetails = async (id) => {
    const details = await Rating.findById(id).populate({
        path: "user host",
        select: "name email phone",
    });

    return details;
};
