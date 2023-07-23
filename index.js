const express = require('express');
const connectDB = require('./config/database');
const authRouter = require('./router/authRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Starting the server ${PORT}...`);
})