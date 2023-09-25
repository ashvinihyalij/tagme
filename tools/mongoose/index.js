const mongoose = require('mongoose');

const mongodbUrl = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(
            mongodbUrl
        );
        console.log(
            "Database connected",
            connect.connection.host,
            connect.connection.name
        );
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;