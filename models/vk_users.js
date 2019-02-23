module.exports = (sequelize, DataType) =>
    sequelize.define('vkUsers', {
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
        }
    });
