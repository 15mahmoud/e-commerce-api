const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // eslint-disable-next-line eqeqeq
    if (process.env.NODE_ENV == 'development') {
        // eslint-disable-next-line no-use-before-define
        sendErrorForDev(err, res);
    } else {
        // eslint-disable-next-line no-use-before-define
        sendErrorForPro(err, res);
    }
}

    
    
    const sendErrorForDev = (err, res) => res.status(400).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    const sendErrorForPro = (err, res) => res.status(400).json({
            status: err.status,
            message: err.message
            
        })

module.exports = globalError;