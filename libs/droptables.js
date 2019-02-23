const to = require('await-to-js').default;

module.exports = _ => {
    const log = _.log.extend('dropTables');
    _.dropTables = async () => {
        log('Удаление всех таблиц из БД ...');
        const [err] = await to(_.db.sequelize.drop());
        if (err) return Promise.reject(err);
        log('Все таблицы удалены');
        return Promise.resolve();
    };
};
