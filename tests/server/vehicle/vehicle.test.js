import Vehicle from "../../../models/Vehicle.js";
import {connect, disconnect} from "../../utils/mongoose.js";
import 'dotenv/config.js';


let createdVehicle;
const vehicle = {
    _id: "5fd85d9c9ffe45173c3e4507",
    make: "Toyota",
    model: "Camry",
    year: 2005,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ducimus earum est id numquam perspiciatis!",
    category: "automobile",
    features: ["AC", "USB Charger"],
    cost: 300,
    volume: "70L",
    doors: 4,
    seats: 6,
    fuel_type: 'gasoline',
    transmission: "manual",
    address: "Dutse Alhaji Abuja",
    images: [
        "https://res.cloudinary.com/abdraqeeb/image/upload/v1607964143/Ride%20Cars/pm1wsbtl0gabkdn1aehw.jpg",
        "https://res.cloudinary.com/abdraqeeb/image/upload/v1607964112/Ride%20Cars/bqdfikpbifajtvw0mosj.jpg",
        "https://res.cloudinary.com/abdraqeeb/image/upload/v1607964105/Ride%20Cars/t5rhh0yqhxatee54nxho.jpg",
        "https://res.cloudinary.com/abdraqeeb/image/upload/v1607964088/Ride%20Cars/g7tacabgcisxylmhjq7w.jpg"
    ],
    isVerified: true,
    isBooked: true,
    book_date: "2020-12-28",
    user: "5fd85d9c9ffe45173c3e44da"
};

beforeEach(async () => {
    await connect();
    await Vehicle.deleteMany({});
});

describe('The Vehicle Model', () => {
    it('it should format address into GeoJSON object before saving', async () => {
        createdVehicle = await Vehicle.create(vehicle);

        expect(createdVehicle).toHaveProperty('location');
        expect(createdVehicle).toHaveProperty('location.formattedAddress');
    });
});

afterEach(async () => {
    await Vehicle.deleteMany({});
    await disconnect();
});

