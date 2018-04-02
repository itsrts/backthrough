'use strict';
const Hapi  = require('hapi');
const Q     = require('q');

let options     = {
    port    : 8080
};

const goodOptions = {
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
};

class InsuranceResponse {

    constructor(reply) {
        this.reply      = reply;
    }

    sendResponse(statusCode, data) {
        this.reply(data).code(statusCode);
    }
}

class InsuranceServer {

    constructor() {
        this.server   = new Hapi.Server();
        this.server.connection(options);
    }

    registerPlugins() {
        let q = Q.defer();
        this.server.register({
            register    : require('good'),
            options     : goodOptions
        }, err => {
            if(err) {
                q.reject(err);
            } else {
                q.resolve();
            }
        });
        return q;
    }

    async start(port = 8080) {
        await this.registerPlugins();
        this.server.start(err => {
            if(err) {
                throw err;
            } else {
                console.log(`Server running at: ${this.server.info.uri}`);
            }
        });
    }

    /**
     * Adds a new GET route to the server with the passed handler as the listener
     * @param {string} path 
     * @param {function} handler 
     */
    get(path, handler) {
        this.server.route({ method: 'GET', path: path,
            handler: (request, reply) => {
                handler(request, new InsuranceResponse(reply));
            }
        });
        return this;
    }

    /**
     * Adds a new route to the server with the passed handler as the listener
     * @param {string} path 
     * @param {function} listener 
     */
    add(method, path, listener) {
        this.server.route({ method: method, path: path,
            handler: (request, reply) => {
                listener(request, new InsuranceResponse(reply));
            }
        });
        return this;
    }

    /**
     * Adds a new POST route to the server with the passed handler as the listener
     * @param {string} path 
     * @param {function} handler 
     */
    post(path, handler) {
        this.server.route({ method: 'POST', path: path,
            handler: (request, reply) => {
                handler(request, new InsuranceResponse(reply));
            }
        });
        return this;
    }

}

module.exports = InsuranceServer;