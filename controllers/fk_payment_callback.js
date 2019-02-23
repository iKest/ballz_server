require('json5/lib/register');
const { URL } = require('url');
const to = require('await-to-js').default;
const shop = require('config').get('shop');
const { fkError } = require('../libs/errors/custom_errors.js');

module.exports = _ => {
    _.fk_payment_callback = async (req, res, next) => {
        const [err, [user, item]] = await to(
            Promise.all([
                _.db.models.fkUsers.findOne({
                    where: {
                        user_id: req.query.user_id
                    }
                }),
                _.db.models.coins.findOne({
                    where: {
                        item: req.query.item,
                        shop: req.query.platform
                    }
                })
            ])
        );
        if (err) throw fkError('FK_ERROR_DB', err);
        if (!user) throw fkError('FK_ERROR_USER');
        const plainUser = user.get({
            plain: true
        });
        if (req.query.sig !== plainUser.sig) throw fkError('FK_ERROR_PASSWORD');
        const plainItem = item.get({
            plain: true
        });
        if (!item) throw fkError('FK_ERROR_PRODUCT');
        if (plainItem.quantity <= 0) throw fkError('FK_ERROR_PRODUCT_QUANTITY');
        if (plainUser.cash < plainItem.price - plainItem.discount)
            throw fkError('FK_ERROR_NO_MONEY');
        const img = new URL(plainItem.image, shop.images);
        switch (req.query.method) {
            case 'get_item':
                Object.assign(res.locals, {
                    image: img.href,
                    price: plainItem.price - plainItem.discount,
                    discount: Math.round((plainItem.discount / plainItem.price) * 100),
                    cash: plainUser.cash,
                    title: plainItem.title,
                    description: plainItem.description
                });
                break;
            case 'buy_item':
                user.coins += plainItem.nominal;
                item.quantity -= 1;
                user.cash -= plainItem.price - plainItem.discount;
                {
                    const [err1] = await to(
                        Promise.all([
                            item.save(),
                            user.save(),
                            _.db.models.fkPurcashes.create({
                                user_id: req.query.user_id,
                                product_code: plainItem.item,
                                amount: plainItem.price - plainItem.discount,
                                discount: plainItem.discount
                            })
                        ])
                    );
                    if (err1) throw fkError('FK_ERROR_DB', err1);
                }
                Object.assign(res.locals, {
                    cash: user.cash
                });
                break;
            default:
                throw fkError('FK_ERROR_REQUEST');
        }
    };
};
