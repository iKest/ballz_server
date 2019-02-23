module.exports = (sequelize, DataType) =>
    sequelize.define('coins', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shop: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        item: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        image: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        price: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        discount: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0,
            unique: false
        },
        nominal: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        }
    });
