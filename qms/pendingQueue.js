'use strict';

let SimpleQueue     = require('./simpleQueue');
let CONFIG          = require('./config');
let IMS             = require('../ims');

class PendingQueue extends SimpleQueue {

    constructor() {
        super(CONFIG.QUEUES.pending, true);
    }

    onMessage(msg) {
        console.log("we got this : ", msg);
        // add order to redis
    }
}

module.exports = PendingQueue;