require('json5/lib/register');
const util = require('util');
const { checkSchema, oneOf, validationResult } = require('express-validator/check');
const { apiError } = require('../../libs/errors/custom_errors.js');

const main = require('./schemas/api/main.json5');
const getStats = require('./schemas/api/get_stats.json5');
const getAmo = require('./schemas/api/get_amo.json5');
const getItems = require('./schemas/api/get_items.json5');
const getCoins = require('./schemas/api/get_coins.json5');
const setStats = require('./schemas/api/set_stats.json5');
const setAmo = require('./schemas/api/set_amo.json5');

module.exports = _ => {
    _.api_validator = [
        checkSchema(main),
        oneOf([
            checkSchema(getStats),
            checkSchema(getAmo),
            checkSchema(getCoins),
            checkSchema(getItems),
            checkSchema(setStats),
            checkSchema(setAmo)
        ]),
        (req, res, next) => {
            if (_.logger)
                _.logger.info(
                    util.inspect(req.body, {
                        depth: null
                    })
                );
            try {
                validationResult(req).throw();
                next();
            } catch (err) {
                throw apiError('API_ERROR_REQUEST', err);
            }
        }
    ];
};
