require('json5/lib/register');
const validator = require('validator');
const util = require('util');
const { checkSchema, oneOf, validationResult } = require('express-validator/check');
const socials = require('config').get('socials');
const { okError } = require('../../libs/errors/custom_errors.js');
const { checkSignature } = require('../../libs/utils.js');

const main = require('./schemas/ok/main.json5');
const buyProduct = require('./schemas/ok/buy_product.json5');
const subscription = require('./schemas/ok/subscription.json5');
const trialSubscription = require('./schemas/ok/trial_subscription.json5');

module.exports = _ => {
    _.ok_validator = [
        checkSchema(main),
        oneOf([checkSchema(buyProduct), checkSchema(subscription), checkSchema(trialSubscription)]),
        (req, res, next) => {
            if (_.logger)
                _.logger.info(
                    util.inspect(req.query, {
                        depth: null
                    })
                );
            try {
                validationResult(req).throw();
            } catch (err) {
                throw okError('OK_ERROR_PAYMENT', err);
            }
            const date = validator.toDate(req.query.transaction_time);
            if (!date) throw okError('OK_ERROR_PAYMENT', new Error('date is wrong'));
            if (!checkSignature(req.query, socials.ok.secret)) throw okError('OK_ERROR_SIGNATURE');
            next();
        }
    ];
};
