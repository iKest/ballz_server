const util = require('util');
const builder = require('xmlbuilder');
const env = require('config').util.getEnv('NODE_ENV');
const errors = require('../../libs/errors/errors');

const errorResponce = (errorCode, errorMsg) =>
    builder
        .create('ns2:error_response', {
            encoding: 'utf-8'
        })
        .att('xmlns:ns2', 'http://api.forticom.com/1.0/')
        .ele('error_code', errorCode)
        .up()
        .ele('error_msg', errorMsg)
        .up();

module.exports = _ => {
    _.ok_error = (err, req, res, next) => {
        let code, message;
        let logType = 'warn';
        if (err.name && err.name === 'OkError') ({ code, message } = err);
        else {
            ({ code } = errors.get('OK_ERROR_UNKNOWN'));
            message = env !== 'production' ? err.message : errors.get('OK_ERROR_UNKNOWN').message;
            logType = 'error';
        }
        const resp = errorResponce(code, message);
        if (_.logger) {
            _.logger[logType](
                util.inspect(err, {
                    depth: null
                })
            );
            _.logger.info(
                resp.end({
                    pretty: true
                })
            );
        }
        res.header('Content-Type', 'application/xml');
        res.header('invocation-error', code);
        res.status(200);
        res.send(resp.end());
    };
};
