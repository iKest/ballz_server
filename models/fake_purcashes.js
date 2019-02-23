module.exports = (sequelize, DataType) =>
    sequelize.define('fkPurcashes', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        product_code: {
            type: DataType.STRING,
            allowNull: false,
            unique: false
        },
        amount: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        },
        discount: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        }
    });
