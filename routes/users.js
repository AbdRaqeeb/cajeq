import express from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users.js';

import User from '../models/User.js';

const router = express.Router({ mergeParams: true });

import advancedResults from '../middleware/advancedResults.js';
import { protect, authorize } from '../middleware/auth.js';

import vehicleRouter from './vehicle.js';
import ratingRouter from './rating.js';

// Reroute into other resource routers
router.use('/:userId/vehicles', vehicleRouter);
router.use('/:userId/ratings', ratingRouter);

router
    .route('/')
    .get(protect, authorize('admin'), advancedResults(User), getUsers)
    .post(protect, authorize('admin'), createUser);

router
    .route('/:id')
    .get(protect, getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

export default router;