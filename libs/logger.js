const winston = require('winston');
const morgan = require('morgan');
const app = require('config').get('app');
const { isObject } = require('./utils.js');
require('winston-loggly-bulk');

const transports = [];

if (app.loggers) {
    if (isObject(app.loggers))
        transports.push(new winston.transports[app.loggers.name](app.loggers.options));
    else if (Array.isArray(app.loggers) && app.loggers.length)
        app.loggers.forEach(el => transports.push(new winston.transports[el.name](el.options)));
}

module.exports = _ => {
    _.logger = false;
    if (transports.length) {
        _.logger = winston.createLogger({
            transports,
            exitOnError: false
        });
        const loggerstream = {
            write: (message, encoding) => {
                _.logger.info(message);
            }
        };
        _.use(
            morgan('combined', {
                stream: loggerstream
            })
        );
    }
};
