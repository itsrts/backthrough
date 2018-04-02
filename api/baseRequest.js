'use strict';

const Q     = require('q');
let _       = require('lodash');
let v       = require('../lib/schemaValidator');

class BaseRequest {

    constructor(server, method, path) {
        this.requestSchema = null;
        server.add(method, path, (request, response) => {
            this.execute(request, response);
        });
        console.log("route added", method, path);
    }

    setRequestBodySchema(requestSchema) {
        return this.requestSchema = requestSchema;
    }

    /**
     * The function resolves a promise if there is not requestSchema
     * Else it validates the passed JSON with the requestSchema
     * @param {JSON} body the json body to be validated
     */
    async sanityChecks(body) {
        if(this.requestSchema) {
            let result   = v.validate(body, this.requestSchema);
            if(!result.valid) {
                return Q.reject( {
                    code    :   412,
                    message :   result.error
                });
            } else {
                return Q.resolve();
            }
        } else {
            return Q.resolve();
        }
    }

    /**
     * Formats the data to used futher to process the request
     * @param {*} request 
     * @param {JSON} body 
     */
    async formatData(request, body) {
        // return body;
        return Q.resolve(body);
    }
    
    /**
     * Fetch the details required from DB or any other source
     * The formatted data is then manipulated and resolves the updated one
     * @param {*} request 
     * @param {JSON} body 
     * @param {JSON} data 
     */
    async fetchDetails(request, body, data) {
        return Q.resolve(data);
    }

    /**
     * Validates the details fetched if required
     * This is the final step before actually processing the request
     * @param {*} request 
     * @param {JSON} body 
     * @param {JSON} data 
     */
    async verifyProcess(request, body, data) {
        return Q.resolve(data);
    }

    /**
     * Do any db updations or other steps to be process to fulfill the request
     * @param {*} request 
     * @param {JSON} body 
     * @param {JSON} data 
     */
    async doProcess(request, body, data) {
        return Q.resolve(data);
    }

    async makeResponse(request, body, data, info) {
        throw "not yet supported";
    }

    async makeError(request, body, data, error) {
        return Q.resolve({
            code    : 400,
            message : error
        });
    }

    /**
     * Used to support, async process.
     * The process doesn't concern the sync response sent with the request
     * 
     * @param {*} request 
     * @param {JSON} body 
     * @param {JSON} data 
     * @param {JSON} info 
     */
    async postProcess(request, body, data, info) {
        return Q.resolve({});
    }

    async execute(request, response) {
        let 
            body    = request.payload || {},
            query   = request.query || {},
            params  = request.params || {},
            data    = {},
            info    = {},
            res     = {};

        _.extend(body, query, params);
        try {
            await this.sanityChecks(body);
            data    = await this.formatData(request, body);
            data    = await this.fetchDetails(request, body, data);
            data    = await this.verifyProcess(request, body, data);
            info    = await this.doProcess(request, body, data);

            res     = await this.makeResponse(request, body, data, info);

            let formattedResponse = res;
            // check if we have the proper format
            if(!formattedResponse.code) {
                formattedResponse = {
                    code    : 200,
                    body    : res
                }
            }
            response.sendResponse(formattedResponse.code, formattedResponse.body);
        } catch (error) {
            response.sendResponse(error.code || 400, error);
            return;
        }
        this.postProcess(request, body, data, info);
    }
}

module.exports = BaseRequest;