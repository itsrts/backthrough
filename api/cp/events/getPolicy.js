'use strict';

let CpGetPolicy = require('../cpGetPolicy');

class GetPolicy extends CpGetPolicy {

    constructor(server) {
        super(server, 'POST', '/v1/cp/events/policies');
    }

    makeResponse(request, body, data, info) {
        return {code : 200, body : {}};
    }
}

module.exports = GetPolicy;