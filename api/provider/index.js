'use strict';

let NewItem     = require('./newItem');
let ActiveItems = require('./activeItems');

let init    = function(server) {
    new NewItem(server);
    new ActiveItems(server);
}

module.exports = init;