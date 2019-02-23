const util = require('util');
const app = require('config').get('app');
const { URLSearchParams, URL } = require('url');

module.exports = _ => {
    _.fk_response = (req, res, next) => {
        if (_.logger)
            _.logger.info(
                util.inspect(
                    {
                        ...res.locals,
                        method: req.query.method
                    },
                    {
                        depth: null
                    }
                )
            );
        const cancelParams = new URLSearchParams({
            auth_key: req.query.auth_key,
            user_id: req.query.user_id,
            custom_args: 'payment=cancel'
        });
        const okParams = new URLSearchParams({
            auth_key: req.query.auth_key,
            user_id: req.query.user_id,
            custom_args: 'payment=ok'
        });
        const buyURL = new URL(`${app.protocol}://${req.get('host')}${req.originalUrl}`);
        buyURL.searchParams.set('method', 'buy_item');
        Object.assign(res.locals, {
            staticURL: app.staticURL,
            cancelURL: `${app.clientUrl}?${cancelParams.toString()}`,
            okURL: `${app.clientUrl}?${okParams.toString()}`,
            buyURL: buyURL.toString()
        });
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.removeHeader('X-Frame-Options');
        res.render(`${req.query.method}.hbs`);
    };
};
