'use strict';

let InsRequest  = require('../../lib/insRequest');
let schema      = require('./schema.js');

class CpGetPolicy extends InsRequest {

    constructor(server, method, path) {
        super(server, method, path);
        this.setRequestBodySchema(schema.CP_GET_POLICY);
    }
}

module.exports = CpGetPolicy;