const express = require('express');
const router = express.Router();

router.route('/signup').post((req, res) => {
    require('./postSignup')(req, res);
});

module.exports = router;