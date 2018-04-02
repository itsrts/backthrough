'use strict';

let init    = function(server) {

    // require('./pa')(server);
    // require('./cp')(server);
    require('./consumer')(server);
    require('./provider')(server);
}



module.exports = init;