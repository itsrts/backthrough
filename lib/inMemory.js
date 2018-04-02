'use strict';

const redis   = require('redis');

let Q   = require('q');

class InMemory {
    constructor(database = 0) {
        this.database   = database;
        this.connected  = null;
        this.client     = null;
        this.connect(database);
    }

    connect(database) {
        let deferred = Q.defer();

        if(this.connected === null) {
            console.log("Connecting to the Redis Client");
            this.client = redis.createClient(database);
            this.connected = false;
        }

        this.client.on("ready", (obj) => {
            this.connected = true;
            deferred.resolve(this.client);
        });

        this.client.on("error", (err) => {
            this.connected = null;
            deferred.reject(err);
        });
        return deferred.promise;
    }

    getAll(map) {
        let defer = Q.defer();

        Q(this.connect(this.database))
        .then(client => {
            this.client.hgetall(map, function(err, obj) {
                defer.resolve(obj);
            });
        })
        .fail(err => {
            console.log(err);
            defer.reject(err);
        });
        return defer.promise;
    }

    saveToMap(map, key, value) {
        let defer = Q.defer();

        Q(this.connect(this.database))
        .then(client => {
            client.hmset(map, key, value, function(err, obj) {
                console.log(`Saved : Key : ${key} | Value : ${value} ${obj}`);
                defer.resolve(value);
            });
        })
        .fail(err => {
            defer.reject(err);
        });
        return defer.promise;
    }

    save(key, value) {
        let defer = Q.defer();

        Q(this.connect(this.database))
        .then(client => {
            client.set(key, value, function(err, obj) {
                console.log(`Saved : Key : ${key} | Value : ${value} ${obj}`);
                defer.resolve(value);
            });
        })
        .fail(err => {
            defer.reject(err);
        });
        return defer.promise;
    }

    get(key) {
        let defer = Q.defer();

        Q(this.connect(this.database))
        .then(client => {
            client.get(key, (err, value) => {
                console.log(`Got : Key : ${key} | Value : ${value}`);
                try {
                    defer.resolve(JSON.parse(value));
                } catch (error) {
                    defer.resolve(value);
                }
            });
        })
        .fail(err => {
            defer.reject(err);
        });
        return defer.promise;
    }

    getFromMap(map, key) {
        let defer = Q.defer();

        Q(this.connect(this.database))
        .then(client => {
            client.hmget(map, key, (err, value) => {
                console.log(`Got : Key : ${key} | Value : ${value}`);
                try {
                    defer.resolve(JSON.parse(value[0]));
                } catch (error) {
                    defer.resolve(value[0]);
                }
            });
        })
        .fail(err => {
            defer.reject(err);
        });
        return defer.promise;
    }
}

module.exports = InMemory;