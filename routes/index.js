module.exports = (app) => {
    const authRouter = require('./authRouter');
    app.use('/auth', authRouter);
}
//const express = require('express');

