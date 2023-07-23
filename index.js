const express = require('express');
const connectDB = require('./config/database');
const authRouter = require('./router/authRouter');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Starting the server ${PORT}...`);
})