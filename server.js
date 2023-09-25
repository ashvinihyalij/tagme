const express = require('express');
// Gives access to .env variables via `process.env.VAR_NAME`
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./tools/mongoose');
const logger = require('./tools/winston');

// Creates the express application
const app = express();

app.set('port', (process.env.PORT || 2016));
app.use(express.json()); // Express in built parser to parse req.body
app.use(express.urlencoded({extended: true}));

// Run the connection
connectDB();

const mongodbUrl = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI
const sess = {
    store: MongoStore.create({ mongoUrl: mongodbUrl }),
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: {}
};
app.use(session(sess));

require('./tools/morgan')(app);
require('./routes')(app);

app.listen(app.get('port'), () => {
    logger.log('info',`server is running on port ${app.get('port')}`);
});

//module.exports = app;