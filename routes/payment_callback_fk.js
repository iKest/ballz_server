const routes = require('config').get('routes');

module.exports = _ => {
    _.use(routes.fk.payment, _.fk_validator);
    _.getAsync(routes.fk.payment, _.fk_payment_callback);
    _.use(routes.fk.payment, _.fk_response);
    _.use(routes.fk.payment, _.fk_error);
};
