const path = require('path');
const cron = require('node-cron')

const controller = require(path.join(__dirname, '../controller/controller'));

// cron.schedule(second minute hour day_of_month month day_of_week)
// cron.schedule(* * * * *) => Every second, Every minute.... once per second
// cron.schedule(*/2 * * * *) => Once every other second
// cron.schedule(1 * * * *) => Once every minute
// cron.schedule(* 1 * * *) => Once every hour
// cron.schedule(0,30 * * * *) => Twice per minute
controller.checkDB();

var task = cron.schedule("0,15,30,45 * * * * *", async function(){
    await controller.checkMailSchedual();
    // await controller.deleteMessageQueue();
});
//Creates DB if it does not exist

/**
 * Routes all api requests. 
 * All client requests will be send here and and the right functions here will send a request to the controller.
 *
 * @param {App} router - The express application.
 */
function router(router) {
    router.get('/api/messages', async (req, res) => {
        try {

            const messages = await controller.getMessages();

            res.send(JSON.stringify({ messages: messages }))
        } catch (error) {
            console.log("Error Occured: "+error);

            res.send(JSON.stringify({ error: error }))
        }
    });
    /**
     * Create a new message.
     *
     * @req.query = {passwd, email, send_time}
     */
    router.post('/api/message', async (req, res) => {
        try {
            const message = await controller.postMessage(req.body);
            res.send("Message was created");
        } catch (error) {
            console.log("Error: ",error)
            res.send(JSON.stringify({ error: error }))
        }
    });
};
module.exports = {
    router,
}

