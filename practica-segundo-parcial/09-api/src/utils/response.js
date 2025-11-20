const HttpStatus = require("./HttpStatus");

function success(res, data, status = HttpStatus.OK) {
    return res.status(status).json({
        success: true,
        data: data
    })
}

function failed(res, message, status = HttpStatus.BAD_REQUEST) {
    return res.status(status).json({
        success: false,
        error: message
    })
}

module.exports = { success, failed }