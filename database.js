'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('recu1', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false
});

sequelize.
    authenticate()
    .then(() => { console.log('DB is connected') })
    .catch((err) => { console.error('Unable to connect to the database:'); });

module.exports = sequelize;