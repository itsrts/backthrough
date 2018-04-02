'use strict';

let Q           = require('q');
let sequelize   = require('./index');
let bunyan      = require('bunyan');
let L           = bunyan.createLogger({name: 'myapp'});

let dbHandler   = require('../lib/dbHandler')('backthrough');

class BaseModel {

    constructor(table, data) {
        this.tableName  = table;
        this.data       = data;
    }

    save() {
        let deferred = Q.defer();

        dbHandler.insert(this.tableName, this.data)
        .then(obj => {
            L.info('inserted', this.data);
            deferred.resolve(obj);
        })
        .fail(error => {
            L.info('error', error);
            deferred.reject(error);
        });
        return deferred.promise;
    }

    static findAll(table, filter) {
        let deferred = Q.defer();

        dbHandler.findAll(table, filter)
        .then(obj => {
            L.info('found with filters', filter);
            deferred.resolve(obj);
        })
        .fail(error => {
            L.info('error', error);
            deferred.reject(error);
        });
        return deferred.promise;
    }

}

module.exports = BaseModel;