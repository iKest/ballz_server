const to = require('await-to-js').default;

module.exports = _ => {
    const log = _.log.extend('syncDB');
    _.syncDb = async force => {
        log('Синхронизация таблиц БД с моделями данных ...');
        const [err] = await to(
            _.db.sequelize.sync({
                force
            })
        );
        if (err) return Promise.reject(err);
        log('Все таблицы синхронизированны ...');
        return Promise.resolve();
    };
};
