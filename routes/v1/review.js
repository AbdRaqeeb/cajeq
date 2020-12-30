import express from 'express';
import {
    addReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
} from '../../controllers/v1/review.js';

const router = express.Router({mergeParams: true});
import Review from '../../models/Review.js';

import advancedResults from '../../middleware/advancedResults.js';
import {protect, authorize} from '../../middleware/auth.js';

router
    .route('/')
    .get(advancedResults(Review, {
            path: 'vehicle user',
            select: 'name email phone make model year cost'
        }),
        getReviews
    )
    .post(protect, addReview);

router
    .route('/:id')
    .get(getReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview);

export default router;