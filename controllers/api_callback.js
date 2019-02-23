const { URL } = require('url');
const to = require('await-to-js').default;
const shop = require('config').get('shop');
const { apiError } = require('../libs/errors/custom_errors.js');

module.exports = _ => {
    _.api_callback = async (req, res, next) => {
        switch (req.body.method) {
            case 'get_stats':
                res.locals.resp = {
                    level: req.user.get('level', {
                        plain: true
                    }),
                    score: req.user.get('score', {
                        plain: true
                    })
                };
                break;
            case 'get_amo':
                res.locals.resp = {
                    amo: JSON.parse(
                        req.user.get('amo', {
                            plain: true
                        })
                    )
                };
                break;
            case 'get_items':
                {
                    const [err, result] = await to(
                        _.db.models.coins.findAndCountAll({
                            where: {
                                shop: req.body.platform
                            },
                            attributes: [
                                'item',
                                'title',
                                'description',
                                'image',
                                'price',
                                'discount'
                            ],
                            raw: true
                        })
                    );
                    if (err) throw apiError('API_ERROR_DB', err);
                    if (result.count === 0) throw apiError('API_ERROR_ITEMS');
                    result.rows.forEach(el => {
                        const img = new URL(el.image, shop.images);
                        el.image = img.href;
                    });
                    res.locals.resp = {
                        items: result.rows
                    };
                }
                break;
            case 'get_coins':
                res.locals.resp = {
                    coins: req.user.get('coins', {
                        plain: true
                    })
                };
                break;
            case 'set_stats':
                {
                    const [err] = await to(
                        req.user.update({
                            score: req.body.score,
                            level: req.body.level
                        })
                    );
                    if (err) throw apiError('API_ERROR_DB', err);
                    res.locals.resp = {
                        status: 'done'
                    };
                }
                break;
            case 'set_amo':
                {
                    const [err] = await to(
                        req.user.update({
                            amo: JSON.stringify(req.body.amo)
                        })
                    );
                    if (err) throw apiError('API_ERROR_DB', err);
                    res.locals.resp = {
                        status: 'done'
                    };
                }
                break;
            default:
                throw apiError('API_ERROR_REQUEST');
        }
    };
};
