const config = require('config');
const to = require('await-to-js').default;
const { apiError } = require('../../libs/errors/custom_errors.js');
const { calcSignature } = require('../../libs/utils.js');

module.exports = _ => {
    _.api_user_validator = async (req, res, next) => {
        // eslint-disable-next-line no-unused-vars
        let user, sig, created, err;
        const newUserData = {
            user_id: req.body.user_id,
            score: 0,
            level: 0,
            coins: 0,
            amo: JSON.stringify(config.get('newUser').amo),
            cash: config.get('newUser').cash
        };
        switch (req.body.platform) {
            case 'vk':
                sig = calcSignature(
                    '_',
                    req.body.session_key,
                    req.body.user_id,
                    config.get('socials').vk.secret
                );
                if (sig !== req.body.sig) throw apiError('API_ERROR_SIGNATURE');
                [err, [user, created]] = await to(
                    _.db.models.vkUsers.findCreateFind({
                        where: {
                            user_id: req.body.user_id
                        },
                        defaults: newUserData
                    })
                );
                if (err) throw apiError('API_ERROR_DB', err);
                break;
            case 'ok':
                sig = calcSignature(
                    '',
                    req.body.user_id,
                    req.body.session_key,
                    config.get('socials').ok.secret
                );
                if (sig !== req.body.sig) throw apiError('API_ERROR_SIGNATURE');
                [err, [user, created]] = await to(
                    _.db.models.okUsers.findCreateFind({
                        where: {
                            user_id: req.body.user_id
                        },
                        defaults: newUserData
                    })
                );
                if (err) throw apiError('API_ERROR_DB', err);
                break;
            case 'fk':
                [err, user] = await to(
                    _.db.models.fkUsers.findOne({
                        where: {
                            user_id: req.body.user_id
                        }
                    })
                );
                if (err) throw apiError('API_ERROR_DB', err);
                if (!user) {
                    [err, user] = await to(
                        _.db.models.fkUsers.create({
                            sig: req.body.sig,
                            ...newUserData
                        })
                    );
                    if (err) throw apiError('API_ERROR_DB', err);
                } else if (req.body.sig !== user.sig) throw apiError('API_ERROR_PASSWORD');
                break;
            default:
                throw apiError('API_ERROR_REQUEST');
        }
        req.user = user;
    };
};
