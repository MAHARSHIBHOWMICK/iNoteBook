const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook"; // Add your database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process on connection failure
    }
};

module.exports = connectToMongo;

