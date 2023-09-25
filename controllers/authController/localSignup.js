const m = require('../../models');
const localSignup = (params, callback) => {
    return callback(new m.ApiResponse('Some required parameters are not provided', 400));
}

module.exports = localSignup