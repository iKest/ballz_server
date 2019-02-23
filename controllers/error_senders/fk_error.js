const util = require('util');
const { URLSearchParams } = require('url');
const app = require('config').get('app');
const env = require('config').util.getEnv('NODE_ENV');
const errors = require('../../libs/errors/errors');

module.exports = _ => {
    _.fk_error = (err, req, res, next) => {
        const cancelParams = new URLSearchParams({
            auth_key: req.query.auth_key,
            user_id: req.query.user_id,
            custom_args: 'payment=cancel'
        });
        Object.assign(res.locals, {
            staticURL: app.staticURL,
            cancelURL: `${app.clientUrl}?${cancelParams.toString()}`
        });
        let logType = 'warn';
        if (err.name && err.name === 'FkError') {
            Object.assign(res.locals, {
                error_code: err.code,
                error_msg: err.message
            });
        } else {
            Object.assign(res.locals, {
                error_code: errors.get('FK_ERROR_UNKNOWN').message,
                error_msg:
                    env !== 'production' ? err.message : errors.get('FK_ERROR_UNKNOWN').message
            });
            logType = 'error';
        }
        if (_.logger) {
            _.logger[logType](
                util.inspect(err, {
                    depth: null
                })
            );
        }
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.removeHeader('X-Frame-Options');
        res.render(`error.hbs`);
    };
};
