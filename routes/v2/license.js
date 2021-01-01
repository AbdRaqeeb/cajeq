import express from 'express';
import {
    addLicense,
    updateLicense
} from '../../controllers/v2/license.js';

const router = express.Router();

import {protect} from '../../middleware/auth.js';


router.route('/').post(protect, addLicense);

router.route('/:id').put(protect, updateLicense);


export default router;

