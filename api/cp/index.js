'use strict';

let init    = function(server) {
    require('./events')(server);
}

module.exports = init;