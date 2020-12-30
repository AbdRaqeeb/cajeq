import express from 'express';
import {
    addVehicleImages
} from '../../controllers/v2/vehicle.js';

const router = express.Router({mergeParams: true});

import {protect} from '../../middleware/auth.js';


router.route('/:id/images').put(protect, addVehicleImages);

export default router;