const mysql = require('mysql2/promise');
const config = require('config').get('db');
const { prompt } = require('inquirer');
const to = require('await-to-js').default;

const statuses = new Map([
    [0x0001, 'SERVER_STATUS_IN_TRANS'],
    [0x0002, 'SERVER_STATUS_AUTOCOMMIT'],
    [0x0008, 'SERVER_MORE_RESULTS_EXISTS'],
    [0x0010, 'SERVER_STATUS_NO_GOOD_INDEX_USED'],
    [0x0020, 'SERVER_STATUS_NO_INDEX_USED'],
    [0x0040, 'SERVER_STATUS_CURSOR_EXISTS'],
    [0x0080, 'SERVER_STATUS_LAST_ROW_SENT'],
    [0x0100, 'SERVER_STATUS_DB_DROPPED'],
    [0x0200, 'SERVER_STATUS_NO_BACKSLASH_ESCAPES'],
    [0x0400, 'SERVER_STATUS_METADATA_CHANGED'],
    [0x0800, 'SERVER_QUERY_WAS_SLOW'],
    [0x1000, 'SERVER_PS_OUT_PARAMS'],
    [0x2000, 'SERVER_STATUS_IN_TRANS_READONLY'],
    [0x4000, 'SERVER_SESSION_STATE_CHANGED']
]);
const questions = [
    {
        type: 'input',
        name: 'user',
        message: 'Введите имя root пользователя сервера БД:'
    },
    {
        type: 'password',
        name: 'password',
        mask: '*',
        message: 'Введите пароль root пользователя сервера БД:'
    }
];

module.exports = _ => {
    const log = _.log.extend('createDB');
    _.createDb = async () => {
        const [err, data] = await to(prompt(questions));
        if (err) return Promise.reject(err);
        const { dialect, pool, define, operatorsAliases, logging, ...dbConf } = Object.assign(
            {
                user: data.user,
                password: data.password
            },
            config.params
        );
        log('Подключение к серверу БД ...');
        const [err1, connection] = await to(mysql.createConnection(dbConf));
        if (err1) return Promise.reject(err1);
        log('Соединение с сервером БД установлено ...');
        log('Удаление БД, старой если она уже существует ...');
        const [err2, data1] = await to(
            connection.execute(`DROP DATABASE IF EXISTS ${config.database}`)
        );
        log(
            `Операция выполнена с serverStatus:${
                statuses.has(data1[0].serverStatus)
                    ? statuses.get(data1[0].serverStatus)
                    : data1[0].serverStatus
            } ...`
        );
        if (err2) return Promise.reject(err2);
        log('Создание новой БД ...');
        const [err3, data2] = await to(
            connection.execute(
                `CREATE DATABASE IF NOT EXISTS ${config.database} DEFAULT CHARACTER SET utf8;`
            )
        );
        if (err3) return Promise.reject(err3);
        log(
            `БД создана, serverStatus:${
                statuses.has(data2[0].serverStatus)
                    ? statuses.get(data2[0].serverStatus)
                    : data2[0].serverStatus
            } ...`
        );
        log('Создание нового пользователя, если его не существует ...');
        const [err4, data3] = await to(
            connection.execute(
                `CREATE USER IF NOT EXISTS '${config.username}@localhost' IDENTIFIED BY '${
                    config.password
                }';`
            )
        );
        if (err4) return Promise.reject(err4);
        log(
            `Пользователь создан или уже существует, serverStatus:${
                statuses.has(data3[0].serverStatus)
                    ? statuses.get(data3[0].serverStatus)
                    : data3[0].serverStatus
            } ...`
        );
        log('Назначение прав пользователя ...');
        const [err5, data4] = await to(
            connection.execute(
                `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON ${
                    config.database
                }.* TO '${config.username}@localhost';`
            )
        );
        if (err5) return Promise.reject(err5);
        log(
            `Права пользователя назначены, serverStatus:${
                statuses.has(data4[0].serverStatus)
                    ? statuses.get(data4[0].serverStatus)
                    : data4[0].serverStatus
            } ...`
        );
        return Promise.resolve();
    };
};
