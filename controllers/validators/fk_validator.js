require('json5/lib/register');
const util = require('util');
const { checkSchema, validationResult } = require('express-validator/check');
const { fkError } = require('../../libs/errors/custom_errors.js');

const main = require('./schemas/fk/main.json5');

module.exports = _ => {
    _.fk_validator = [
        checkSchema(main),
        (req, res, next) => {
            if (_.logger)
                _.logger.info(
                    util.inspect(req.query, {
                        depth: null
                    })
                );
            try {
                validationResult(req).throw();
                next();
            } catch (err) {
                throw fkError('FK_ERROR_REQUEST', err);
            }
        }
    ];
};
