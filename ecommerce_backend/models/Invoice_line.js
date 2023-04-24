module.exports = (sequelize, DataTypes) => {
    const Invoice_line = sequelize.define('Invoice_line', {
        idinvoice_line: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        rid_invoice: {
            type: DataTypes.INTEGER,
        },
        rid_article: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.DECIMAL,
        }
    }, { tableName: 'invoice_line', timestamps: false });

    return Invoice_line;
}