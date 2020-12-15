import asyncHandler from 'express-async-handler';
import ErrorResponse from "../utils/errorResponse.js";
import {generateReference} from "../utils/reference.js";
import {getDifferenceInDays} from "../utils/date.js";
import sendEmail from "../utils/sendEmail.js";

// models
import Booking from "../models/Booking.js";
import Vehicle from '../models/Vehicle.js';


/**
 * @desc    Get bookings
 * @route   GET /api/v1/bookings
 * @access  Private / Admin
 * */
export const getBookings = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get user bookings
 * @route   GET /api/v1/bookings/user
 * @access  Private
 * */
export const userBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({user: req.user.id})
        .populate({
            path: "vehicle",
            select: "make year model cost pick_up"
        })
        .populate({
            path: "host",
            select: "name email phone"
        });

    if (bookings.length < 1) {
        return next(
            new ErrorResponse(`No booking available`, 404)
        );
    }

    res.status(200).json({
       success: true,
        count: bookings.length,
       data: bookings
    });
});

/**
 * @desc    Get host// bookings
 * @route   GET /api/v1/bookings/host
 * @access  Private
 * */
export const hostBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({host: req.user.id})
        .populate({
            path: "vehicle",
            select: "make year model cost pick_up"
        })
        .populate({
            path: "user",
            select: "name email phone"
        });

    if (bookings.length < 1) {
        return next(
            new ErrorResponse(`No booking available`, 404)
        );
    }

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

/**
 * @desc    Get single booking
 * @route   GET /api/v1/bookings/:id
 * @access  Private
 * */
export const getBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
        .populate({
            path: "user host",
            select: "name email phone"
        })
        .populate({
            path: "vehicle",
            select: "make year cost model location.formattedAddress"
        });

    if (!booking) {
        return next(
            new ErrorResponse(`Booking with the ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== booking.user && req.user.id !== booking.host && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not authorized to access resource`, 405)
        );
    }


    res.status(200).json({
        success: true,
        data: booking
    });
});

/**
 * @desc    Create booking
 * @route   POST /api/v1/vehicles/:vehicleId/bookings
 * @access  Private
 * */
export const createBooking = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.vehicleId).populate({
        path: "user",
        select: "name email phone"
    });

    if (!vehicle) {
        return next(
            new ErrorResponse(`Vehicle with ID ${req.params.vehicleId} not found`, 404)
        );
    }

    // check if vehicle has not been booked for selected date
    if (vehicle.book_date) {
        const date1 = new Date(vehicle.book_date);
        const date2 = new Date(req.body.start_date);

        if (date2.getTime() < date1.getTime()) {
           return next(
               new ErrorResponse(`Vehicle not available at the selected date`, 400)
           );
        }
    }

    const {start_date, end_date} = req.body;

    // convert to date
    const count1 = new Date(start_date);
    const count2 = new Date(end_date);

    const amount = vehicle.cost * getDifferenceInDays(count1, count2);
    req.body.vehicle = req.params.vehicleId;
    req.body.user = req.user.id;
    req.body.host = vehicle.user._id;
    req.body.reference = generateReference(6);
    req.body.amount = amount;
    req.body.pick_up = vehicle.location.formattedAddress;

    const booking = await Booking.create(req.body);

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(booking._id);

    //create confirm url
    const acceptURL = `${req.protocol}://${req.get('host')}/api/v1/bookings/:id/accept`;
    const rejectURL = `${req.protocol}://${req.get('host')}/api/v1/bookings/:id/reject`;

    const message = `
        You are receiving this email because a user ${details.user.name} booked your vehicle ${details.vehicle.make} 
        ${details.vehicle.model} ${details.vehicle.year} with pick up location address at : ${details.pick_up}
        for the period of ${details.start_date} to ${details.end_date}.
         Please make a PUT request to accept booking: \n\n ${acceptURL} \n\n or \n\n
         make a PUT request to reject booking: \n\n ${rejectURL}
        `;

    await sendEmail({
        email: details.host.email,
        subject: 'Cajeq Vehicle Booking',
        message
    });

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update booking status
 * @routes  PUT /api/v1/bookings/:id/accept
 * @access  Private
 * */
export const  acceptBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booing with the ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== booking.host && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not authorized to access resource`, 405)
        );
    }

    await Vehicle.findByIdAndUpdate(booking.vehicle, {isBooked: true, book_date: booking.end_date});

    await Booking.findByIdAndUpdate(req.params.id, {status: 'accepted'}, {
        new: true
    });

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update booking status
 * @routes  PUT /api/v1/bookings/:id/reject
 * @access  Private
 * */
export const rejectBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booing with the ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== booking.host && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not authorized to access resource`, 405)
        );
    }

    await Booking.findByIdAndUpdate(req.params.id, {status: 'rejected'}, {
        new: true
    });

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update booking status
 * @routes  PUT /api/v1/bookings/:id/cancel
 * @access  Private
 * */
export const cancelBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booing with the ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== booking.user && req.user.id !== booking.host && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not authorized to access resource`, 405)
        );
    }

    await Vehicle.findByIdAndUpdate(booking.vehicle, {isBooked: false, book_date: undefined});

    await Booking.findByIdAndUpdate(req.params.id, {status: 'canceled'}, {
        new: true
    });

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update booking status
 * @routes  PUT /api/v1/bookings/:id/cancel
 * @access  Private
 * */
export const finishBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booing with the ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== booking.user && req.user.id !== booking.host && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not authorized to access resource`, 405)
        );
    }

    await Vehicle.findByIdAndUpdate(booking.vehicle, {isBooked: false, book_date: undefined});

    await Booking.findByIdAndUpdate(req.params.id, {status: 'finished'}, {
        new: true
    });

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update booking
 * @routes  PUT /api/v1/bookings/:id
 * @access  Private
 * */
export const updateBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booing with the ID ${req.params.id} not found`, 404)
        );
    }

    if (req.user.id !== booking.user && req.user.id !== booking.host && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User not authorized to access resource`, 405)
        );
    }

    await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Update booking to paid
 * @routes  PUT /api/v1/bookings/:id/pay
 * @access  Private
 * */
export const updateBookingToPaid = asyncHandler(async (req, res, next) => {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booing with the ID ${req.params.id} not found`, 404)
        );
    }

    booking.isPaid = true;
    booking.paidAt = Date.now();
    booking.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
    };

    await booking.save();

    // Retrieve user, host & vehicle name from booking
    const details = await getDetails(req.params.id);

    res.status(200).json({
        success: true,
        data: details
    });
});

/**
 * @desc    Delete booking
 * @routes  DELETE /api/v1/bookings/:id
 * @access  Private
 * */
export const deleteBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new ErrorResponse(`Booking with the ID ${req.params.id} not found`, 404)
        );
    }

    await booking.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// get booking details function
const getDetails = async (id) => {
    const details = await Booking.findById(id).populate({
        path: "user host",
        select: "name email phone",
    }).populate({
        path: "vehicle",
        select: "make year model cost images"
    });

    return details;
};