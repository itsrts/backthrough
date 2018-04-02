'use strict';

let BaseModel    = require('./baseModel');

let sample  = {
    title       : "some fancy title for the order",
    id          : "id of the order",
    items       : [{
        "id"        : "",
        "title"     : "name of the item/job",
        "subtitle"  : "",
        "quantity"  : 1,
        "price"     : 100.00,
        "detail"    : ""
    }],
    status      : ["Requested", "Accepted", "Rejected", "Removed", "Progress", "Done"],
    createdAt   : "timestamp",
    updatedAt   : "timestamp",
    provider    : "id of the provider",
    consumer    : "id of the consumer",
    
};

class Order extends BaseModel {

    constructor(data) {
        super('orders', data);
    }
}

module.exports = Order;