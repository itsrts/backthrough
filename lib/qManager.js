'use strict';

let Q       = require('q');
let amqp = require('amqplib/callback_api');

let Q_URL   = 'amqp://localhost';

class QueueManager {

    constructor(name) {
        this.name   = name;
        this.connect(name)
        .then(ch => {
            this.channel = ch;
        })
        .fail(err => {
            console.log("error while connecting to channel");
        });
    }

    connect(name) {
        let defer   = Q.defer();
        if(this.channel) {
            return this.channel;
        }
        amqp.connect(Q_URL, (err, conn) => {
            if(err) {
                defer.reject(err);
                return;
            }
            conn.createChannel((err, ch) => {
                ch.assertQueue(this.name, {durable: true});
                if(err) {
                    defer.reject(err);
                } else {
                    this.channel = ch;
                    defer.resolve(ch);
                }
            })
        });
        return defer.promise;
    }

    sendJson(json) {
        this.send(JSON.stringify(json));
    }

    send(data) {
        Q(this.connect(this.name))
        .then(channel => {
            this.channel.sendToQueue(this.name, new Buffer(data), {persistent: true});
        })
        .fail(err => {
            console.log(err);
        });
    }

    listen(callback) {
        Q(this.connect(this.name))
        .then(channel => {
            this.channel.consume(this.name, async (msg) => {
                msg = msg.content.toString();
                try {
                    msg = JSON.parse(msg);
                } catch (error) {
                    // console.log("not json", msg.content);
                }
                await callback(msg);
                this.channel.ack(msg);
            }, {noAck: false});
        })
        .fail(err => {
            console.log(err);
        });
    }

}

module.exports = QueueManager;