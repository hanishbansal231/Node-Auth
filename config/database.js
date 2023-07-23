const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose
    .connect(process.env.DATABASE_URL,{
        useNewUrlparser: true,
        useUnifiedTopology: true,
    })
    .then(() => {console.log('Connect to Database...')})
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
}
module.exports = connectDB;