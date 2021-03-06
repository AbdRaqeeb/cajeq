import asyncHandler from 'express-async-handler';
import ErrorResponse from '../../utils/errorResponse.js';

// models
import Review from '../../models/Review.js';
import Vehicle from "../../models/Vehicle.js";

/**
 * @desc    Get reviews
 * @route   GET /api/v1/reviews
 * @route   GET /api/v1/vehicles/:vehicleId/reviews
 * @access  Public
 * */
export const getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.vehicleId) {
        const reviews = await Review.find({vehicle: req.params.vehicleId});

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    }
    res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single review
 * @route   GET /api/v1/reviews/:id
 * @access  Public
 * */
export const getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
        .populate({
            path: 'user',
            select: 'name email phone'
        })
        .populate({
            path: 'vehicle',
            select: 'make model year cost'
        });

    if (!review) {
        return next(
            new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: review
    });
});

/**
 * @desc    Add review
 * @route   POST /api/v1/vehicles/:vehicleId/reviews
 * @access  Private
 * */
export const addReview = asyncHandler(async (req, res, next) => {
    req.body.vehicle = req.params.vehicleId;
    req.body.user = req.user.id;

    const vehicle = await Vehicle.findById(req.params.vehicleId);

    if (!vehicle) {
        return next(
            new ErrorResponse(
                `No vehicle with the id of ${req.params.vehicleId}`,
                404
            )
        );
    }

    const review = await Review.create(req.body);

    const details = await getDetails(review._id);

    res.status(201).json({
        success: true,
        data: details
    });
});


/**
 * @desc    Update review
 * @route   PUT /api/v1/reviews/:id
 * @access  Private
 * */
export const updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    review.save();

    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:id
 * @access  Private
 * */
export const deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(
            new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
        );
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }

    await review.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// get booking details function
const getDetails = async (id) => {
    const details = await Review.findById(id).populate({
        path: "user",
        select: "name email phone",
    }).populate({
        path: "vehicle",
        select: "make year model cost"
    });

    return details;
};
