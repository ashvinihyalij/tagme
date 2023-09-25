const authController = require('../../controllers/authController');
const m = require('../../models');

const postSignup = (req, res) => {
    const params = req.body;
    authController.localSignup(params, (apiResponse) => {
        console.log(apiResponse);
        //if(apiResponse.error) { return res.status(apiResponse.status).json(apiResponse) }
        apiResponse.error && res.status(apiResponse.status).json(apiResponse);

    });
    //res.json({'message' : "okkk"});
}

module.exports = postSignup;