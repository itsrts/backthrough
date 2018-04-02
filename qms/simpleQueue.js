'use strict';

let QueueManager    = require('../lib/qManager');

class SimpleQueue {

    constructor(name, listen = false) {
        this.queue  = new QueueManager(name);
        if(listen) {
            this.queue.listen(this.onMessage);
        }
    }

    onMessage(msg) {
        console.log(msg);
    }

    sendJson(json) {
        this.queue.sendJson(json);
    }

    send(data) {
        this.queue.send(data);
    }
}

module.exports = SimpleQueue;