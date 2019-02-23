const builder = require('xmlbuilder');

module.exports = _ => {
    _.ok_response = (req, res, next) => {
        const resp = builder
            .create('callbacks_payment_response', {
                encoding: 'utf-8'
            })
            .att('xmlns', 'http://api.forticom.com/1.0/')
            .txt('true');
        if (_.logger)
            _.logger.info(
                resp.end({
                    pretty: true
                })
            );
        res.header('Content-Type', 'application/xml');
        res.status(200);
        res.send(resp.end());
    };
};
