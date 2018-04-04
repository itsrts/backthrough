'use strict';
const Server = require('./server/hapiServer');
// const Server = require('./server/expressServer');

let server = new Server();


let ins = require('./api')(server);
let qms = require('./qms');

// start the QMS
qms();

server.start();