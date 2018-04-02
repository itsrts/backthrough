'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('insurance_db', 'root', 'paytm@197', {
    host : 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

module.exports = sequelize;