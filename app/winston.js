/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const appRoot = require('app-root-path');
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = 'info.log';

// specify log format
const format = ':method\t\t:url\t\t:status\t\t:response-time[0]ms';

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'info.log'), { flags: 'a' });

// define the custom settings for each transport (file, console)
// const options = {
//   file: {
//     level: 'info',
//     filename: `${appRoot}/app/info.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true
//   }
// };

// // create a logger
// // instantiate a new Winston Logger with the settings defined above
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File(options.file),
//     new winston.transports.Console(options.console)
//   ],
//   exitOnError: false // do not exit on handled exceptions
// });

// // Log a  message
// // create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write(message, encoding) {
//     logger.info(message);
//   }
// };

// export logger
module.exports = logger;
