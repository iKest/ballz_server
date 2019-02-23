require('json5/lib/register');
const fromEntries = require('object.fromentries');
const to = require('await-to-js').default;
const data = require('../migrations/data.json5');

module.exports = _ => {
    const log = _.log.extend('updateTables');
    log('Обновление данных из файла миграций ...');
    _.updateTables = () => {
        log('Обновление данных из файла миграций ...');
        return Promise.all(
            ...Object.keys(data)
                .filter(el => Object.prototype.hasOwnProperty.call(_.db.models, el))
                .map(el =>
                    data[el].items.map(async item => {
                        const [err, it] = await to(
                            _.db.models[el].findOrCreate({
                                where: fromEntries(
                                    data[el].params.map(param => [param, item[param]])
                                ),
                                defaults: item
                            })
                        );
                        if (err) {
                            log(
                                `Ошибка поиска/создания в таблице ${el} [item:${item.item} shop:${
                                    item.shop
                                }], ${err.message}`
                            );
                            return Promise.reject(err);
                        }
                        if (it[1])
                            log(
                                `Записть в таблице ${el} создана с [id:${it[0].id} item:${
                                    it[0].item
                                } shop:${it[0].shop}]`
                            );
                        else {
                            const [error, dat] = await to(it[0].update(item));
                            if (error) {
                                log(
                                    `Ошибка обновления в таблице ${el} [id:${it[0].id} item:${
                                        it[0].item
                                    } shop:${it.shop}], ${err.message}`
                                );
                                return Promise.reject(error);
                            }
                            log(
                                `Записть в таблице ${el} обновлена с [id:${dat.id} item:${
                                    dat.item
                                } shop:${dat.shop}]`
                            );
                        }
                        return Promise.resolve();
                    })
                )
        );
    };
};
