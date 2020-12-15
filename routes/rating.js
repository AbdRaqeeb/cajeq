import express from 'express';
import {
    addRating,
    getRatings,
    getRating,
    updateRating,
    deleteRating
} from '../controllers/rating.js';

const router = express.Router({mergeParams: true});
import Rating from '../models/Rating.js';

import advancedResults from '../middleware/advancedResults.js';
import {protect} from '../middleware/auth.js';

router
    .route('/')
    .get(advancedResults(Rating, {
            path: 'host user',
            select: 'name email phone'
        }),
        getRatings
    )
    .post(protect, addRating);

router
    .route('/:id')
    .get(getRating)
    .put(protect, updateRating)
    .delete(protect, deleteRating);

export default router;