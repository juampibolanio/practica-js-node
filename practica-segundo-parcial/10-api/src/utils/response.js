const HttpStatus = require("../utils/HttpStatus");

function success(res, data, status = HttpStatus.OK) {
    return res.status(status).json({
        success: true,
        data: data
    })
}

function failed(res, message, status = HttpStatus.INTERVAL_SERVER_ERROR) {
    return res.status(status).json({
        success: false,
        error: message
    })
}

module.exports = { success, failed }