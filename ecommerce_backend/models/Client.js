module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        idclient: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        adress: {
            type: DataTypes.STRING,
        },
        town: {
            type: DataTypes.STRING,
        },
        postal_code: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },

    }, { tableName: 'client', timestamps: false });

    return Client;
}