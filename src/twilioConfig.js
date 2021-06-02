require('dotenv').config()
const twilio = require('twilio')

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console


try {
    const client = new twilio(accountSid, authToken, {
        lazyLoading: true
    });
    module.exports = client
} catch (e) {
    console.log(e)
    throw new Error(e)
}