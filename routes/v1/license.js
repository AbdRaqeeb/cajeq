import express from 'express';
import {
    addLicense,
    updateLicense,
    deleteLicense,
    getLicenses,
    getLicense,
    verifyLicense
} from '../../controllers/v1/license.js';

const router = express.Router();

import advancedResults from "../../middleware/advancedResults.js";
import {protect, authorize} from '../../middleware/auth.js';

import License from "../../models/License.js";

router
    .route('/')
    .get(protect, authorize('admin'), advancedResults(License, {
        path: "user",
        select: "name email phone"
    }), getLicenses)
    .post(protect, addLicense);

router
    .route('/:id')
    .get(protect, getLicense)
    .put(protect, updateLicense)
    .delete(protect, deleteLicense);

router.route('/:id/verify').put(protect, authorize('admin'), verifyLicense);

export default router;

