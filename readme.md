The providers have a group of APIs
the consumers have another

there will be few common tasks or APIs shared like auth, exchanging information

Common APIs
    - auth API for login or registration purposes
    - Update an order status (Added/Accepted/Rejected/Removed/InProgress/Done)
    - List of jobs till date ( a simple search with some filters )

List of provider APIs
    - Add a new item/job for availability
    - Get list of waiting queue jobs by provider_id
    - Get the current active queue for a provider

List of consumer APIs
    - Get list of available jobs for a provider
    - Request a job/task
    - Delete a job which is !accepted || !Done for long time
    - Get My Orders (consumers)

*********************************************************************************

We can use Redis as in memory cache to store the active queues and update database on a later stage.
All of th jobs done will be shifted to a new queue and the queue gets flushed into the database with a cap size of 'x' jobs

We would be using socket.io to push update to client and simple REST APIs to get an update from the clients.


A SAMPLE TRANSACTION OF A JOB.
    - A consumer scans or enters the provider_id in the application and gets the list of all       vailable supported jobs by the provider.
    - Selects any of them, this is just like adding items in a cart and checking out later.
    - An order may have multiple items and the items can be updated/fulfilled elementarily.
    - The provider gets a notification about the order and has the option to accept or reject       the  order.
    - Meanwhile the job is sitting on a waiting queue with provider_id as the key.
    - If accepted, the provider can now put the order in progress as required. Also the             consumer has the option to remove the order if it's taking time or for any other reason.
    - The job is now moved to the other queue, which is the active queue for the provider.
    - The provider updates the job as done and consumer gets notified as required.
    - The job is now moved to another queue (done queue) which later gets flushed into the          database.



Key Points : 
 1. Only DONE jobs are saved in the database
 2. Actions for a job will be send by the API

Every new order is added to the queue for being processed
 - like sending notification
 - adding to the pending queue
 