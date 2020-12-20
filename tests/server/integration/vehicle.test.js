import server from "../../utils/server.js";
import {REGISTER, VEHICLE} from "../../utils/endpoints.js";
import {disconnect} from "../../utils/mongoose.js";
import User from "../../../models/User.js";
import Vehicle from "../../../models/Vehicle.js";

let vehicle = {
    _id: "5fd85d9c9ffe45173c3e4508",
    make: "Toyota",
    model: "Corolla",
    year: 2001,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ducimus earum est id numquam perspiciatis!",
    category: "automobile",
    features: ["AC", "USB Charger"],
    cost: 300,
    volume: "70L",
    doors: 4,
    seats: 6,
    fuel_type: 'gasoline',
    transmission: "manual",
    address: "Kwali Abuja"
};
let user = {
    username: 'vehicle',
    name: 'Test',
    email: 'vehicle@gmail.com',
    password: '123456'
};
let token;

const exec = async () => {
    await User.deleteMany({});
    const response = await server().post(REGISTER).send(user);

    return response;
};

jest.mock('cloudinary-simple-upload');
jest.mock('../../../utils/geocoder.js');
jest.mock('../../../utils/sendEmail.js');

describe('Vehicles Endpoint', () => {
    describe('Add Vehicle', () => {
        it('should add vehicle successfully', async () => {
            const result = await exec();
            token = result.body.token;
            const file = `C:\\Users\\acer\\Desktop\\AbdRaqeeb\\cajeq\\tests\\utils\\user1.png`;

            const response = await server()
                .post(VEHICLE)
                .attach('images', file)
                .attach('images', file)
                .attach('images', file)
                .field('_id', '5fd85d9c9ffe45173c3e4508')
                .field('make', 'Toyota')
                .field('model', 'Corolla')
                .field('year', 2001)
                .field('doors', 4)
                .field('cost', 300)
                .field('volume', '70L')
                .field('seats', 6)
                .field('transmission', 'manual')
                .field('fuel_type', 'gasoline')
                .field('address', 'Kwali Abuja')
                .field('features', ["AC", "USB Charger"])
                .field('description', 'Lorem ipsum dolor')
                .field('category', 'automobile')
                .set('Authorization', `Bearer ${token}`);
        });
    });
});

afterAll(async () => {
    await Vehicle.deleteMany({});
    await User.deleteMany({});
    await disconnect();
});