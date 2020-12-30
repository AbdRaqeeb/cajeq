import {uploadImages} from 'cloudinary-simple-upload';
import asyncHandler from 'express-async-handler';
import ErrorResponse from "../../utils/errorResponse.js";
import Vehicle from '../../models/Vehicle.js';
import folders from "../../helpers/folders.js";
import User from "../../models/User.js";

/**
 * @desc    Add vehicles
 * @route   POST /api/v1/vehicles
 * @access  Private
 * */
export const addVehicle = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id;

    let vehicle = await Vehicle.create(req.body);

    // log req body
    console.log('Body', req.body);

    // decode array of features
    const features = (typeof (req.body.features)=== 'string') ? JSON.parse(JSON.stringify(req.body.features)) : req.body.features;
    req.body.features = features;

    vehicle = await Vehicle.findById(vehicle._id).populate('user', 'name email phone');

    res.status(201).json({
        success: true,
        data: vehicle
    })
});

/**
 * @desc    Add vehicle images
 * @route   PUT /api/v1/vehicles/:id
 * @access  Private
 * */
export const addVehicleImages = asyncHandler(async (req, res, next) => {
    let vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return next(
            new ErrorResponse(`Vehicle with ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== vehicle.user.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not allowed to update vehicle`, 405)
        );
    }

    if (!req.files || req.files.length < 2) {
        return next(
            new ErrorResponse('Please upload vehicle images. Two or more', 400)
        );
    }

    // Upload image or images
    const images = await uploadImages(req.files.images, folders.cars, 'owner');

    vehicle = await Vehicle.findByIdAndUpdate(req.params.id, {images}, {
        new: true,
        runValidators: false
    });

    vehicle = await Vehicle.findById(vehicle._id).populate('user', 'name email phone');

    res.status(200).json({
        success: true,
        data: vehicle
    });
});

/**
 * @desc    Get vehicles
 * @route   GET /api/v1/vehicles
 * @route   GET /api/users/:userId/vehicles
 * @access  Public
 * */
export const getVehicles = asyncHandler(async (req, res, next) => {
    if (req.params.userId) {
        const vehicles = await Vehicle.find({user: req.params.userId});

        return res.status(200).json({
            success: true,
            count: vehicles.length,
            data: vehicles
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

/**
 * @desc    Get user vehicles
 * @route   GET /api/v1/vehicles/user
 * @access  Private
 * */
export const myVehicles = asyncHandler(async (req, res, next) => {
    const vehicles = await Vehicle.find({user: req.user.id});

    res.status(200).json({
        success: true,
        count: vehicles.length,
        data: vehicles
    });
});

/**
 * @desc    View user vehicles
 * @route   GET /api/v1/vehicles/:userId/user
 * @access  Private
 * */
export const viewUserVehicles = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(
            new ErrorResponse(`User with ID: ${req.params.userId}`, 404)
        );
    }
    const vehicles = await Vehicle.find({user: req.params.userId});

    res.status(200).json({
        success: true,
        count: vehicles.length,
        data: vehicles,
        user
    })
});

/**
 * @desc    Get single vehicle
 * @route   GET /api/v1/vehicles/:id
 * @access  Public
 * */
export const getVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id).populate({
        path: "user",
        select: "name email phone"
    });

    if (!vehicle) {
        return next(
            new ErrorResponse(`Vehicle with ID ${req.params.id} not found`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: vehicle
    });
});

/**
 * @desc    Update vehicle
 * @route   PUT /api/v1/vehicles/:id
 * @access  Private
 * */
export const updateVehicle = asyncHandler(async (req, res, next) => {
    let vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return next(
            new ErrorResponse(`Vehicle with ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== vehicle.user.toString() && req.user.role === 'admin') {
        return next(
            new ErrorResponse(`User not authorized to update resource`, 401)
        );
    }

    // make sure multiple images is uploaded
    if (req.files) {
        if (Object.keys(req.files).length < 2) {
            return next(
                new ErrorResponse(`Please upload multiple images`, 400)
            );
        }
    }

    req.body.images = (req.files) ? await uploadImages(req.files.images, folders.cars, 'owner') : vehicle.images;

    await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    await vehicle.save({validateBeforeSave: false});

    vehicle = await Vehicle.findById(req.params.id).populate({
        path: "user",
        select: "name email phone"
    });

    res.status(200).json({
        success: true,
        data: vehicle
    });
});

/**
 * @desc    Delete vehicle
 * @route   DELETE /api/v1/vehicles/:id
 * @access  Private
 * */
export const deleteVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return next(
            new ErrorResponse(`Vehicle with ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== vehicle.user.toString() && req.user.role === 'admin') {
        return next(
            new ErrorResponse(`User not authorized to delete resource`, 401)
        );
    }

    await vehicle.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

/**
 * @desc    Get vehicles within a radius
 * @route   GET /api/v1/vehicles/radius/:lat/:long/:distance
 * @access  Public
 * */
export const getVehiclesInRadius = asyncHandler(async (req, res, next) => {
    const {lat, long, distance} = req.params;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const vehicles = await Vehicle.find({
        location: {$geoWithin: {$centerSphere: [[long, lat], radius]}}
    }).populate('user', 'name email phone');

    res.status(200).json({
        success: true,
        count: vehicles.length,
        data: vehicles
    });
});



