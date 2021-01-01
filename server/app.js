import express from 'express';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import {config} from 'cloudinary-simple-upload';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import {errorHandler} from '../middleware/error.js';
import connectDB from '../config/db.js';
import 'dotenv/config.js';

// connect to database
connectDB();

// connect to cloudinary
config(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

// Import v1 routes
import vehicles from '../routes/v1/vehicle.js';
import auth from '../routes/v1/auth.js'
import users from '../routes/v1/users.js';
import ratings from '../routes/v1/rating.js';
import bookings from '../routes/v1/booking.js';
import reviews from '../routes/v1/review.js';
import licenses from '../routes/v1/license.js';

//Import v2 routes
import vehicles_v2 from '../routes/v2/vehicle.js';
import licenses_v2 from '../routes/v2/license.js';

const app = express();

//Body parser
app.use(express.json({extended: false}));

// file upload
app.use(fileUpload());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet({
        contentSecurityPolicy: false,
    }
));

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static('public'));

// Mount routers
app.use('/api/v1/vehicles', vehicles);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/ratings', ratings);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/licenses', licenses);

// version 2 routers
app.use('/api/v2/vehicles', vehicles_v2);
app.use('/api/v2/licenses', licenses_v2);

app.use(errorHandler);

export default app;