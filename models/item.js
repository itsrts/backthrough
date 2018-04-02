'use strict';

let BaseModel   = require('./baseModel');
let Q           = require('q');

let sample  = {
    id          : "",
    title       : "name of the item/job",
    subtitle    : "",
    quantity    : 1,
    price       : 100.00,
    detail      : "",
    status      : ["Requested", "Accepted", "Rejected", "Removed", "Progress", "Done"],
    createdAt   : "timestamp",
    updatedAt   : "timestamp",
    provider    : "id of the provider",
};

class Item extends BaseModel {

    constructor(data) {
        super('items', data);
    }

    static getItemsByProvider(provider) {
        let defer = Q.defer();
        BaseModel.findAll('items', {provider : provider})
        .then(defer.resolve)
        .fail(defer.reject);
        return defer.promise;
    }
}

module.exports = Item;