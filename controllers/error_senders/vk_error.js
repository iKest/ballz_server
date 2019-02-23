const util = require('util');
const env = require('config').util.getEnv('NODE_ENV');
const errors = require('../../libs/errors/errors');

module.exports = _ => {
    _.vk_error = (err, req, res, next) => {
        const resp = {};
        let logType = 'warn';
        if (err.name && err.name === 'VkError') {
            resp.error = {
                error_code: err.code,
                error_msg: err.message,
                critical: err.critical
            };
        } else {
            resp.error = {
                error_code: errors.get('VK_ERROR_UNKNOWN').message,
                error_msg:
                    env !== 'production' ? err.message : errors.get('VK_ERROR_UNKNOWN').message,
                critical: errors.get('VK_ERROR_UNKNOWN').critical
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
