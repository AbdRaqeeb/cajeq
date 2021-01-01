import express from 'express';
import {
    createBooking,
    deleteBooking,
    updateBookingToPaid,
    getBooking,
    getBookings,
    updateBooking,
    hostBookings,
    userBookings,
    acceptBooking,
    rejectBooking,
    cancelBooking,
    finishBooking
} from '../../controllers/v1/booking.js';

const router = express.Router({mergeParams: true});

import advancedResults from "../../middleware/advancedResults.js";
import Booking from "../../models/Booking.js";

import {protect, authorize} from '../../middleware/auth.js';

router.route('/user').get(protect, userBookings);
router.route('/host').get(protect, hostBookings);
router
    .route('/')
    .get(protect, authorize('admin'), advancedResults(Booking, {
        path: "user host vehicle",
        select: "name email phone make model year cost images"
    }), getBookings)
    .post(protect, createBooking);

router
    .route('/:id')
    .get(protect, getBooking)
    .put(protect, authorize('admin'), updateBooking)
    .delete(protect, authorize('admin'), deleteBooking);


router.route('/:id/accept').put(protect, acceptBooking);
router.route('/:id/reject').put(protect, rejectBooking);
router.route('/:id/cancel').put(protect, cancelBooking);
router.route('/:id/finish').put(protect, finishBooking);
router.route('/:id/pay').put(protect, updateBookingToPaid);


export default router;