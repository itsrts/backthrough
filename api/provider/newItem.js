'use strict';

let BaseRequest = require('../baseRequest');
let Item       = require('../../models/item');

let schema  = { $id : "/NewOrder", type : "object", properties : {
    title           :   { type : "string"},
    subtitle        :   { type : "string"},
    price           :   { type : "number"},
    detail          :   { type : "string"},
    status          :   { type : "string"},
    createdAt       :   { type : "string"},
    updatedAt       :   { type : "string"},
    provider        :   { type : "integer"}
},
required : ["title", "subtitle", "price", "status", "provider"]
};


class NewItem extends BaseRequest {

    constructor(server) {
        super(server, 'POST', '/provider/newitem');
        this.setRequestBodySchema(schema);
    }

    async doProcess(request, body, data) {
        // save the order in database
        let item   = new Item(data);
        item       = await item.save();
        return item;
    }

    makeResponse(request, body, data, info) {
        return {
            message : "Item Added",
            data    : info
        };
    }
}

module.exports = NewItem;