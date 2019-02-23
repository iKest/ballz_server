const app = require('config').get('app');
const fs = require('fs');
const appRoot = require('app-root-path');
const https = require('https');

module.exports = _ => {
    if (app.https) {
        const privateKey = fs.readFileSync(appRoot.resolve('/sslcert/server.key'), 'utf8');
        const certificate = fs.readFileSync(appRoot.resolve('/sslcert/server.cert'), 'utf8');
        const client = fs.readFileSync(appRoot.resolve('/sslcert/client-key.pem'), 'utf8');
        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: client
        };
        const server = https.createServer(credentials, _);
        server.listen(_.get('port'));
        _.logger.info(`HTTPS Ballzy Server - start at port ${_.get('port')}`);
    } else
        _.listen(_.get('port'), () =>
            _.logger.info(`Ballzy Server - start at port ${_.get('port')}`)
        );
};
