const routes = require('config').get('routes');

module.exports = _ => {
    _.use(routes.vk.payment, _.vk_validator);
    _.postAsync(routes.vk.payment, _.vk_payment_callback);
    _.use(routes.vk.payment, _.vk_response);
    _.use(routes.vk.payment, _.vk_error);
};
