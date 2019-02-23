require('json5/lib/register');
const moment = require('moment');
const to = require('await-to-js').default;
const { URL } = require('url');
const shop = require('config').get('shop');
const { vkError } = require('../libs/errors/custom_errors.js');

module.exports = _ => {
    _.vk_payment_callback = async (req, res, next) => {
        switch (req.body.notification_type) {
            case 'get_item_test':
            case 'get_item':
                {
                    const [err, item] = await to(
                        _.db.models.coins.findOne({
                            where: {
                                item: req.body.item,
                                shop: 'vk'
                            },
                            plain: true
                        })
                    );
                    if (err) throw vkError('VK_ERROR_DB', err);
                    if (!item) throw vkError('VK_ERROR_PRODUCT');
                    const img = new URL(item.image, shop.images);
                    res.locals.resp = {
                        item_id: String(item.id),
                        title: `${item.title}${
                            req.body.notification_type === 'get_item_test'
                                ? ' (тестовый режим)'
                                : ''
                        }`,
                        photo_url: img.href,
                        price: item.price,
                        expiration: 0
                    };
                    if (item.discount > 0) res.locals.resp.discount = item.discount;
                }
                break;
            case 'order_status_change':
            case 'order_status_change_test':
                {
                    let err, item, user, receiver, purcashe;
                    [err, purcashe] = await to(
                        _.db.models.vkPurcashes.findOne({
                            where: {
                                order_id: req.body.order_id
                            },
                            attributes: ['id', 'order_id'],
                            plain: true
                        })
                    );
                    if (err) throw vkError('VK_ERROR_DB', err);
                    if (!purcashe) {
                        const promises = [
                            _.db.models.coins.findByPk(req.body.item_id),
                            _.db.models.vkUsers.findOne({
                                where: {
                                    user_id: req.body.receiver_id
                                }
                            })
                        ];
                        if (req.body.user_id !== req.body.receiver_id)
                            promises.push(
                                _.db.models.vkUsers.findOne({
                                    where: {
                                        user_id: req.body.user_id
                                    }
                                })
                            );
                        [err, [item, receiver, user]] = await to(Promise.all(promises));
                        if (err) throw vkError('VK_ERROR_DB', err);
                        if (!receiver) throw vkError('VK_ERROR_RECEIVER');
                        if (req.body.user_id !== req.body.receiver_id && !user)
                            throw vkError('VK_ERROR_USER');
                        if (!item) throw vkError('VK_ERROR_PRODUCT');
                        const plainItem = item.get({
                            plain: true
                        });
                        plainItem.price -= plainItem.discount;
                        if (req.body.item_price !== plainItem.price)
                            throw vkError('VK_ERROR_PRICE');
                        if (plainItem.quantity <= 0) throw vkError('VK_ERROR_PRODUCT_QUANTITY');
                        receiver.coins += plainItem.nominal;
                        item.quantity -= 1;
                        [err, [item, receiver, purcashe]] = await to(
                            Promise.all([
                                item.save(),
                                receiver.save(),
                                _.db.models.vkPurcashes.create({
                                    notification_type: req.body.notification_type,
                                    user_id: req.body.user_id,
                                    receiver_id: req.body.receiver_id,
                                    order_id: req.body.order_id,
                                    date: moment.unix(req.body.date).format('YYYY-MM-DD HH:mm:ss'),
                                    status: req.body.status,
                                    item: plainItem.item,
                                    item_price: plainItem.price,
                                    item_discount: plainItem.discount,
                                    item_nominal: plainItem.nominal
                                })
                            ])
                        );
                        if (err) throw vkError('VK_ERROR_DB', err);
                    }
                    res.locals.resp = {
                        order_id: purcashe.order_id,
                        app_order_id: purcashe.id
                    };
                }
                break;
            default:
                throw vkError('VK_ERROR_PAYMENT');
        }
    };
};
