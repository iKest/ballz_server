require('json5/lib/register');
const util = require('util');
const { checkSchema, oneOf, validationResult } = require('express-validator/check');
const socials = require('config').get('socials');
const { vkError } = require('../../libs/errors/custom_errors.js');
const { checkSignature } = require('../../libs/utils.js');

const main = require('./schemas/vk/main.json5');
const getProduct = require('./schemas/vk/get_product.json5');
const order = require('./schemas/vk/order.json5');
const subscription = require('./schemas/vk/subscription.json5');

module.exports = _ => {
    _.vk_validator = [
        checkSchema(main),
        oneOf([checkSchema(getProduct), checkSchema(order), checkSchema(subscription)]),
        (req, res, next) => {
            _.logger.info(
                util.inspect(req.body, {
                    depth: null
                })
            );
            try {
                validationResult(req).throw();
            } catch (err) {
                throw vkError('VK_ERROR_PAYMENT', err);
            }
            if (!checkSignature(req.body, socials.vk.secret)) throw vkError('VK_ERROR_SIGNATURE');
            next();
        }
    ];
};
