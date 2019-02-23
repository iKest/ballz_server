const env = require('config').util.getEnv('NODE_ENV');
const util = require('util');
const errors = require('../../libs/errors/errors');

module.exports = _ => {
    _.api_error = (err, req, res, next) => {
        const resp = {};
        let logType = 'warn';
        if (err.name && err.name === 'ApiError') {
            resp.error = {
                error_code: err.code,
                error_msg: err.message
            };
        } else {
            resp.error = {
                error_code: errors.get('API_ERROR_DB').message,
                error_msg: env !== 'production' ? err.message : errors.get('API_ERROR_DB').message
            };
            logType = 'error';
        }
        if (_.logger) {
            _.logger[logType](
                util.inspect(err, {
                    depth: null
                })
            );
            _.logger.info(
                util.inspect(resp, {
                    depth: null
                })
            );
        }
        res.status(200);
        res.json(resp);
    };
};
