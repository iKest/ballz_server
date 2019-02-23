module.exports = (sequelize, DataType) =>
    sequelize.define('fkUsers', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: true
        },
        score: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        level: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        coins: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        amo: {
            type: DataType.TEXT,
            allowNull: false,
            unique: false
        },
        cash: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        sig: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        }
    });
