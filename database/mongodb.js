const mongoose = require('mongoose');
// reads from the .env file and puts its key/value pairs on process.env
require('dotenv').config();

const connectToDatabase = async () => {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDatabase;