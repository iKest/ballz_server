require('json5/lib/register');
const to = require('await-to-js').default;
const { okError } = require('../libs/errors/custom_errors.js');

module.exports = _ => {
    _.ok_payment_callback = async (req, res, next) => {
        const [err, [user, item]] = await to(
            Promise.all([
                _.db.models.okUsers.findOne({
                    where: {
                        user_id: req.query.uid
                    }
                }),
                _.db.models.coins.findOne({
                    where: {
                        item: req.query.product_code,
                        shop: 'ok'
                    }
                })
            ])
        );
        if (err) throw okError('OK_ERROR_DB', err);
        if (!user) throw okError('OK_ERROR_USER');
        if (!item) throw okError('OK_ERROR_PRODUCT');
        const plainItem = item.get({
            plain: true
        });
        if (plainItem.price !== req.query.amount) throw okError('OK_ERROR_PAYMENT');
        if (plainItem.quantity <= 0) throw okError('OK_ERROR_PRODUCT_QUANTITY');
        user.coins += plainItem.nominal;
        item.quantity -= 1;
        {
            const [err1] = await to(
                Promise.all([
                    item.save(),
                    user.save(),
                    _.db.models.okPurcashes.create({
                        user_id: req.query.uid,
                        transaction_id: req.query.transaction_id,
                        call_id: req.query.call_id,
                        transaction_time: req.query.transaction_time,
                        product_code: plainItem.item,
                        amount: plainItem.price,
                        nominal: plainItem.nominal
                    })
                ])
            );
            if (err1) throw okError('OK_ERROR_DB', err1);
        }
    };
};
