import express from 'express';
import {addVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle, getVehiclesInRadius} from '../controllers/vehicle.js';

const router = express.Router({mergeParams: true});

import {protect} from '../middleware/auth.js';
import advancedResults from "../middleware/advancedResults.js";

import bookingRouter from "./booking.js";
import reviewRouter from './review.js';

import Vehicle from '../models/Vehicle.js';


// re-route into booking
router.use('/:vehicleId/bookings', bookingRouter);
router.use('/:vehicleId/reviews', reviewRouter);

router
    .route('/')
    .get(advancedResults(Vehicle, {
        path: "user",
        select: "name email phone"
    }), getVehicles)
    .post(protect, addVehicle);

router
    .route('/:id')
    .get(getVehicle)
    .put(protect, updateVehicle)
    .delete(protect, deleteVehicle);

router.route('/radius/:zipcode/:distance').get(getVehiclesInRadius);
export default router;