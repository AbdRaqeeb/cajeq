import asyncHandler from 'express-async-handler';
import {uploadImage} from 'cloudinary-simple-upload';
import ErrorResponse from "../../utils/errorResponse.js";
import License from "../../models/License.js";
import folders from "../../helpers/folders.js";

/**
 * @desc    Get driver licenses
 * @route   GET /api/v1/licenses
 * @access  Private
 * */
export const getLicenses = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get single driver license
 * @route   GET /api/v1/licenses/:id
 * @access  Private
 * */
export const getLicense = asyncHandler(async (req, res, next) => {
    const license = await License.findById(req.params.id).populate({
        path: "user",
        select: "name email phone"
    });

    if (!license) {
        return next(
            new ErrorResponse(`License with ID ${req.params.id} not found`, 404)
        );
    }

    // Make sure license is retrieved by owner or admin
    if (req.user.id !== license.user.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User cannot fetch this license`, 401)
        );
    }

    res.status(200).json({
       success: true,
       data: license
    });
});

/**
 * @desc    Add license
 * @route   POST /api/v1/licenses
 * @access  Private
 * */
export const addLicense = asyncHandler(async (req, res, next) => {
    if (!req.files) {
        return next(
            new ErrorResponse('Please upload license image', 400)
        );
    }

    req.body.image = await uploadImage(req.files.image, folders.license, 'owner');
    req.body.user = req.user.id;

    const license = await License.create(req.body);

    const details = await getDetails(license._id);

    res.status(201).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update license
 * @route   PUT /api/v1/licenses/:id
 * @access  Private
 * */
export const updateLicense = asyncHandler(async (req, res, next) => {
    const license = await License.findById(req.params.id);

    if (!license) {
        return next(
            new ErrorResponse(`License with ID ${req.params.id} not found`, 404)
        );
    }

    if (!req.files) {
        return next(
            new ErrorResponse('Please upload license image', 400)
        );
    }

    // Make sure license is updated by owner or admin
    if (req.user.id !== license.user.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User cannot update license`, 401)
        );
    }

    const image = await uploadImage(req.files.image, folders.license, 'owner');

    await License.findByIdAndUpdate(req.params.id, {image, isVerified: false}, {
        new: true
    });

    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update license verification status
 * @route   PUT /api/v1/licenses/:id/verify
 * @access  Private
 * */
export const verifyLicense = asyncHandler(async (req, res, next) => {
    const license = await License.findById(req.params.id);

    if (!license) {
        return next(
            new ErrorResponse(`License with ID ${req.params.id} not found`, 404)
        );
    }

    if (!req.files) {
        return next(
            new ErrorResponse('Please upload license image', 400)
        );
    }


    await License.findByIdAndUpdate(req.params.id, {isVerified: req.body.isVerified}, {
        new: true
    });

    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Get single driver license
 * @route   DELETE /api/v1/licenses/:id
 * @access  Private
 * */
export const deleteLicense = asyncHandler(async (req, res, next) => {
    const license = await License.findById(req.params.id);

    if (!license) {
        return next(
            new ErrorResponse(`License with ID ${req.params.id} not found`, 404)
        );
    }

    // Make sure license is updated by owner or admin
    if (req.user.id !== license.user.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User cannot delete license`, 401)
        );
    }

    await license.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});


const getDetails = async (id) => {
    const details = await License.findById(id).populate({
        path: "user",
        select: "name email phone"
    });

    return details;
};