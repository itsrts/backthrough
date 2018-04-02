'use strict';
const InsuranceServer = require('./server/hapiServer');
// const InsuranceServer = require('./server/expressServer');

let server = new InsuranceServer();


let ins = require('./api')(server);
let qms = require('./qms');

// start the QMS
qms();

server.start();