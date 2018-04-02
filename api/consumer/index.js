'use strict';

let NewOrder    = require('./newOrder');

let init    = function(server) {
    new NewOrder(server);
}

module.exports = init;