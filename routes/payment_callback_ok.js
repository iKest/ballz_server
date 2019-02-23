const routes = require('config').get('routes');

module.exports = _ => {
    _.use(routes.ok.payment, _.ok_validator);
    _.getAsync(routes.ok.payment, _.ok_payment_callback);
    _.use(routes.ok.payment, _.ok_response);
    _.use(routes.ok.payment, _.ok_error);
};
