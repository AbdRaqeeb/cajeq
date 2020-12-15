import mongoose from 'mongoose';
import colors from 'colors';
import 'dotenv/config.js';

// models
import User from "./models/User.js";
import License from "./models/License.js";
import Vehicle from "./models/Vehicle.js";
import Review from "./models/Review.js";
import Rating from "./models/Rating.js";
import Booking from "./models/Booking.js";

// import data
import users from "./data/users.js";
import reviews from "./data/reviews.js";
import ratings from "./data/ratings.js";
import bookings from "./data/bookings.js";
import licenses from "./data/licenses.js";
import vehicles from "./data/vehicles.js";

// connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// import data into database
const importData = async () => {
    try {
        await User.create(users);
        await License.create(licenses);
        await Vehicle.create(vehicles);
        await Booking.create(bookings);
        await Review.create(reviews);
        await Rating.create(ratings);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (e) {
        console.error(e)
    }
};

// delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await License.deleteMany();
        await Vehicle.deleteMany();
        await Booking.deleteMany();
        await Review.deleteMany();
        await Rating.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
};


if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}