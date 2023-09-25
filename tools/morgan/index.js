module.exports = function (app) {
    const fs = require('fs')
    const morgan = require('morgan')
    const path = require('path')
    const rfs = require('rotating-file-stream')
  
    const logDirectory = path.join(__dirname, '../../logs')
  
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  
    const accessLogStream = rfs.createStream("access.log", {
      interval: '1d',
      path: logDirectory
    });
    
    app.use(morgan('combined', {stream: accessLogStream}))
  }