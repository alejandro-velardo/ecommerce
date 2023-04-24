module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('Invoice', {
        idinvoice: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE,
        },
        adress: {
            type: DataTypes.STRING,
        },
        town: {
            type: DataTypes.DECIMAL,
        },
        postal_code: {
            type: DataTypes.DECIMAL,
        },
        name: {
            type: DataTypes.STRING
        },
        rid_client: {
            type: DataTypes.INTEGER
        },
        number: {
            type: DataTypes.STRING
        }

    }, { tableName: 'invoice', timestamps: false });

    return Invoice;
}