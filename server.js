const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

// load routes
const bootcamps = require('./routes/bootcamps');

const app = express();

// add body parser
app.use(express.json());

// run dev logging middleware
if(process.env.NODE_ENV === 'Developement'){
    app.use(morgan('dev'));
}

// mount the routes
app.use('/api/v1/bootcamps', bootcamps);

// initiate error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // close server and exit process
    server.close(() => process.exit(1));
});