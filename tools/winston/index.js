const { createLogger, transports, format } = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

let logFullDir = 'logs';
let logDirectory = path.join(__dirname, '../../logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const transport = new (transports.DailyRotateFile)({
    filename: `${logFullDir}/%DATE%-errors.log`,
    datePattern: 'YYYY-MM-DD',
    exitOnError: false,
    level: 'verbose',
    maxSize: '20m',
    format: format.combine(format.timestamp(), format.json())
});

var logger = createLogger({
    transports: [
        new transports.Console({
            colorize: true,
            level: env === 'development' || 'test' ? 'verbose' : 'info',
            exitOnError: false,
            handleExceptions: !(env === 'development' || 'test'),
            format: format.combine(format.timestamp(), format.simple())
        }),
        transport
    ]
});
module.exports = logger;