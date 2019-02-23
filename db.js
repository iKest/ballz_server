const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config').get('db');

let db = null;

module.exports = _ => {
    if (!db) {
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        // Загрузка моделей
        const dir = path.join(__dirname, 'models');
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        /* Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        }); */
    }

    return db;
};
