const consign = require('consign');
const program = require('commander');
const log = require('debug');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config');

log.enable('serviceDB, serviceDB:*');

const app = {
    log: log('serviceDB')
};

app.log(config.util.getEnv('HOSTNAME'));

program
    .version('0.0.1', '-V, --version')
    .option(
        '-C, --create-db',
        'Создать новую БД, если БД с таким именем уже существует, то она будет удалена. ТРЕБУЕТСЯ ВВОД ИМЕНИ И ПРОЛЯ ROOT ПОЛЬЗОВАТЕЛЯ СЕРВЕРА БД!'
    )
    .option(
        '-D, --drop-tables',
        'Удалить все существующие таблицы из БД перед началом синхронизации'
    )
    .option(
        '-F, --force',
        'Удалить таблицу перед синхронизацией каждой таблицы, если она существует'
    )
    .option(
        '-U, --update',
        'Импортировать данные в таблицы после сихронизации. Если данные уже существуют, то они будут перезаписанны, если нет, то созданны новые'
    )
    .parse(process.argv);

const db = _ => {
    const sequelize = new Sequelize(
        config.get('db').database,
        config.get('db').username,
        config.get('db').password,
        config.get('db').params
    );

    const models = {};
    // Загрузка моделей
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        models[model.name] = model;
    });

    /* Object.keys(db.models).forEach(key => {
        db.models[key].associate(db.models);
    }); */

    _.db = {
        sequelize,
        Sequelize,
        models
    };
};

const service = async _ => {
    try {
        if (program.createDb) await _.createDb();
        db(_);
        if (program.dropTables) await _.dropTables();
        await _.syncDb(program.force);
        if (program.update) await _.updateTables();
        _.log('Выполнено...');
        process.exit(0);
    } catch (err) {
        _.log(`Операция завершена с ошибкой: ${err.message}`);
        process.exit(1);
    }
};

consign({
    verbose: false
})
    .include('libs/createdb.js')
    .then('db.js')
    .then('libs/droptables.js')
    .then('libs/syncdb.js')
    .then('libs/updatetables.js')
    .into(app);

service(app);
