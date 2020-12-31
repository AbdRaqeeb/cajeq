import asyncHandler from 'express-async-handler';
import ErrorResponse from "../../utils/errorResponse.js";
import Vehicle from '../../models/Vehicle.js';

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

    const {images} = JSON.parse(JSON.stringify(req.body));

    if (images.length < 2) {
        return next(
            new ErrorResponse(`Please upload multiple images`, 400)
        );
    }

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


