module.exports = (sequelize, DataType) =>
    sequelize.define('vkPurcashes', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        notification_type: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        receiver_id: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        order_id: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: true
        },
        date: {
            type: DataType.DATE,
            allowNull: false,
            unique: false
        },
        status: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        item: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        item_price: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        item_discount: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        item_nominal: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        }
    });
