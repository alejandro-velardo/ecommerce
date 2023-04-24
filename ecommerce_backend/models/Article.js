module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        idarticle: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        stock: {
            type: DataTypes.DECIMAL,
        },
        filename1: {
            type: DataTypes.STRING,
        }

    }, { tableName: 'article', timestamps: false });

    return Article;
}