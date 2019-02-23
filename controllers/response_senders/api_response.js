const util = require('util');

module.exports = _ => {
    _.api_response = (req, res, next) => {
        if (_.logger)
            _.logger.info(
                util.inspect(
                    {
                        response: res.locals.resp
                    },
                    {
                        depth: null
                    }
                )
            );
        res.status(200);
        res.json({
            response: res.locals.resp
        });
    };
};
