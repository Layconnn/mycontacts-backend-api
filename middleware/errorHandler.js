const { constants } = require("../constants");

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    if (!err && statusCode === 200) {
        console.log("No error, all good!");
        return next(); // Pass control to the next middleware
    }    
    console.log("Status Code:", res.statusCode);
    console.log("Error Object:", err);


    if (statusCode === constants.VALIDATION_ERROR){
        res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack});
    }else if(statusCode === constants.NOT_FOUND){
        res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
    }else if(statusCode === constants.UNAUTHORIZED ){
        res.json({title: "Unauthorized access", message: err.message, stackTrace: err.stack});
    }else if(statusCode === constants.FORBIDDEN){
        res.json({title: "Forbidden", message: err.message, stackTrace: err.stack});
    }else if(statusCode === constants.SERVER_ERROR){
        res.json({title: "Server error", message: err.message, stackTrace: err.stack});
    }else{
        res.json({ title: "Unknown error", message: err.message, stackTrace: err.stack });
    }
}

module.exports = errorHandler;