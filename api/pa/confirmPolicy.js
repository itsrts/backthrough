'use strict';

const Q     = require('q');

let InsRequest  = require('../../lib/insRequest');
let schema      = require('./schema');
let template    = require('./template');
let template1    = require('./template.1');

class ConfirmPolicy extends InsRequest {

    constructor(server) {
        super(server, 'POST', '/');
        this.setRequestBodySchema(schema.PA_CONFIRM_POLICY);
    }

    doProcess(request, body, data) {
        let r = JSON.parse("{}");
        return Q(r);
    }

    makeResponse(request, body, data, info) {
        return Q.resolve({code: 200, body : template1.PA_GET_POLICY(data)});
        // return {code: 200, body : template1.PA_GET_POLICY(data)};
    }
}

module.exports = ConfirmPolicy;