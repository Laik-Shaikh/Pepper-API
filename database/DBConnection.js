const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.MONGODB_URL;

const DBConnection = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true
        });
        console.log("Database is Conneted")
    } catch (error) {
        console.log("Failed to Connect Database")
    }
}

mongoose.set('strictQuery', false);
module.exports = DBConnection;