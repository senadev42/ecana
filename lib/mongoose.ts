import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGO_DB_URI) return console.log("Mongo Connection string is not present");

    if(isConnected) return console.log("Using existing connection");

    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        isConnected = true;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}