import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import {generateReference} from "./utils/reference.js";

const arr = [];
const ref = [];

const getId = () => {
    let id;
    let rf;
    for (let i = 0; i < 61; i++) {
        id = new mongoose.Types.ObjectId();
        rf = generateReference(6);
        arr.push(id);
        ref.push(rf);
    }
};

getId();

const data = arr.join('\n\n');
const refs = ref.join('\n\n');


fs.writeFile('id.txt', data, (err) => {
    if (err) return console.log(err);
    console.log('Ids generated successfully'.inverse.green);
});

fs.writeFile('ref.txt', refs, (err) => {
    if (err) return console.log(err);
    console.log('Refs generated successfully'.inverse.cyan);
});