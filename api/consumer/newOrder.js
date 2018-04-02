'use strict';

let BaseRequest     = require('../baseRequest');
let Order           = require('../../models/order');
let PendingQueue    = require('../../qms/pendingQueue');
let QueueConfig     = require('../../qms/config');

let schema  = { $id : "/NewOrder", type : "object", properties : {
    title           :   { type : "string"},
    items           :   { type : "array", items : { type : "object", properties : {
        title           :   { type : "string"},
        quantity        :   { type : "integer"},
        price           :   { type : "number"},
        detail          :   { type : "string"}
    },
    required : ["title", "quantity", "price", "detail"]
    }},
    status          :   { type : "string"},
    provider        :   { type : "integer"},
    consumer        :   { type : "integer"}
},
required : ["title", "items", "status", "provider", "consumer"]
};


class NewOrder extends BaseRequest {

    constructor(server) {
        super(server, 'POST', '/consumer/neworder');
        this.setRequestBodySchema(schema);
        this.pendingQueue   = new PendingQueue();
    }

    async doProcess(request, body, data) {
        // save the order in database
        let order   = new Order(data);
        order       = await order.save();
        this.pendingQueue.sendJson(order);
        return order;
    }

    makeResponse(request, body, data, info) {
        return {
            message : "Order Requested",
            data    : info
        };
    }
}

module.exports = NewOrder;