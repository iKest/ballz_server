const routes = require('config').get('routes');

module.exports = _ => {
    _.use(routes.client.api, _.api_validator);
    _.useAsync(routes.client.api, _.api_user_validator);
    _.useAsync(routes.client.api, _.api_callback);
    _.use(routes.client.api, _.api_response);
    _.use(routes.client.api, _.api_error);
};
