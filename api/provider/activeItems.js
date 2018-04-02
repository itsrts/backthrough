'use strict';

let BaseRequest = require('../baseRequest');
let Item        = require('../../models/item');

let schema  = { $id : "/NewOrder", type : "object", properties : {
    provider_id     :   { type : "integer"}
},
required : ["provider_id"]
};


class NewOrder extends BaseRequest {

    constructor(server) {
        super(server, 'GET', '/provider/{provider_id}/activeitems');
        this.setRequestBodySchema(schema);
    }

    async doProcess(request, body, data) {
        // save the order in database
        let items   = await Item.getItemsByProvider(body.provider_id);
        return items;
    }

    makeResponse(request, body, data, info) {
        return {
            message : "Active Items Found",
            data    : info
        };
    }
}

module.exports = NewOrder;