'use strict';

let GetPolicy   = require('./getPolicy');

let init    = function(server) {
    new GetPolicy(server);
}

module.exports = init;