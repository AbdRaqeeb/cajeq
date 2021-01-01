import asyncHandler from 'express-async-handler';
import ErrorResponse from "../../utils/errorResponse.js";
import License from "../../models/License.js";


/**
 * @desc    Add license
 * @route   POST /api/v1/licenses
 * @access  Private
 * */
export const addLicense = asyncHandler(async (req, res, next) => {
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

    const {image} = req.body;

    if (!license) {
        return next(
            new ErrorResponse(`License with ID ${req.params.id} not found`, 404)
        );
    }

    // Make sure license is updated by owner or admin
    if (req.user.id !== license.user.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User cannot update license`, 401)
        );
    }

    await License.findByIdAndUpdate(req.params.id, {image, isVerified: false}, {
        new: true
    });

    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

const getDetails = async (id) => {
    const details = await License.findById(id).populate({
        path: "user",
        select: "name email phone"
    });

    return details;
};