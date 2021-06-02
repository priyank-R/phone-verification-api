const client = require('./twilioConfig')

const sendVerificationSms = async(code, smsTo, smsToCountryCode = "+91", smsFrom = process.env.TWILIO_ACCOUNT_SENDER_PHONE) => {


    try {
        const response = await client.messages.create({
            body: 'Your Verification Code is: ' + code,
            to: `${smsToCountryCode}${smsTo}`, // Text this number
            from: smsFrom // From a valid Twilio number
        })

    } catch (e) {
        console.log(e)
        return;
    }

    return;

}

module.exports = sendVerificationSms