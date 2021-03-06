const errorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    // log the error on console for dev
    console.log(err.stack.red);

    // mongoose bad objectId
    if(err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new errorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;