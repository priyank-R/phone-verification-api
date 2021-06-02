const express = require('express')
const generateCode = require('./generateCode')
const sendVerificationSms = require('./sendVerificationSms')
const { generateVerificationUrl, verifyUrlWithCode } = require('./verificationUrl')
require('dotenv').config()



const app = express()
app.use(express.json()) //a middleware to the req.body as json before the program accesses it


app.post('/signup', async(req, res) => {
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone

    //1. Save the new user's information  in the database with a field "phone_unverified = true"

    //2. Generate Code
    const code = await generateCode()

    //3. Send Verification SMS using Twilio Library
    await sendVerificationSms(code, phone)

    //4. Generate Verification URL 
    const verificationUrl = await generateVerificationUrl(code.toString())

    //5. Send Verification URL in the Response
    res.status(201).send({ phoneVerificationUrl: verificationUrl })

})

app.post('/signup/verifyphone/:iv/:content/:enteredCode', async(req, res) => {

    const { iv, content, enteredCode } = req.params

    const isValid = verifyUrlWithCode(enteredCode, iv, content)

    if (isValid) {
        //Update the Phone_Verified field of the given user to true
        return res.send('Entered code is valid')
    } else {
        return res.send('Invalid code entered - Please try again  !')
    }


})


app.listen(3000, () => {
    console.log('listening on port 3000')
})