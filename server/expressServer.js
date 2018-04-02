const Express   = require('express');

class InsuranceResponse {

    constructor(res) {
        this.res    = res;
    }

    sendResponse(statusCode, data) {
        console.log(data);
        
        this.res.status(statusCode).send(data);
    }
}

class InsuranceServer {

    constructor() {
        this.server   = new Express();
    }

    start(port = 8080) {
        this.server.listen(port, () => {
            console.log("server started");
        });
    }

    /**
     * Adds a new route to the server with the passed handler as the listener
     * @param {string} path 
     * @param {function} handler 
     */
    get(path, handler) {
        this.server.get(path, (req, res) => {
            handler(req, new InsuranceResponse(res));
        });
    }

}

module.exports = InsuranceServer;