module.exports = (sequelize, DataType) =>
    sequelize.define('okPurcashes', {
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
        transaction_id: {
            type: DataType.BIGINT,
            allowNull: false,
            unique: true
        },
        call_id: {
            type: DataType.BIGINT,
            allowNull: false,
            unique: true
        },
        transaction_time: {
            type: DataType.DATE,
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
        nominal: {
            type: DataType.INTEGER,
            allowNull: false,
            unique: false
        }
    });
