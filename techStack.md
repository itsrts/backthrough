# The project is required to be using the following technologies

## Hapi / Express as the Node framework
A generic server with the implementation of adding a new route, a defined way of sending the response.
Doing this the project is able to obtain a plugin-play model with the which framework to be used.

Both hapiServer.js and expressServer.js have the required methods implemented.
The app.js file can simply change the 'require' of the server and things would work.

## MondoDB as the persistent database
Being in the NoSql era, mongodb simply turns out to be on the top.
The file dbHandler.js implements the basic requirements of the CURD operations.
For we wish to change the underlying DB, the dbHandler file will do the job.

## Redis to act like the caching layer of the application
For being in the start of implementing a caching layer, we are starting with Redis.
inMemory.js manages the connectivity and implementations of all the setter and getter methods.

## RabbitMQ to be the messaging broker
Queue management is required for an easy communication between the servers/application.
qManager.js handels it all.

## ElasticSearch | Logstash | Kibana
ELK stack to be used for taking a look at the logs of the application

## Angular 5.x to be used as the frontend framework



# Project Structure

For most of the directory there's an "index.js" file taking care of what more needs to be done.

## lib
All the files to communicate with external libraries and act as a middleware for the entire application. To mention : 
    - dnhandler.js
    - inMemory.js
    - qManager.js
    - schemaValidator.js

## models
DB Models with all the required implementations required by the application.
baseModel.js extends what's provided by the dbHandler.js from the "lib"
A foreseen plan of implementing cache or slave database to be handled by the dbHandler but the configuration is to be specified by the models itself.

## server
This can be called as the part of the "lib" but kept seperately.
hapiServer.js and expressServer.js
Both of the server implements the required functionality required by the application

## qms
The Queue Management System for the application
It clearly uses the qManager.js from the "lib" for inheriting all the capabilities of that of a queue.
simpleQueue.js extends the basic functionality of qManager.

## ims
The In-Memory System, aka the caching layer for the application
simpleMemoryService.js acts as the extension here, even though inMemory.js takes care of a lot.

## api
The controller for sake of naming it.
baseRequest.js provides the skeleton or lifecycle of a request in the application.
"consumer" and "provider" have their APIs on the their specifics.
