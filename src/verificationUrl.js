const { encrypt, decrypt } = require('./crypto')


let baseUrl = '/signup/verifyphone'

const generateVerificationUrl = (code) => {
    const encryptedcode = encrypt(code)

    const url = baseUrl + `/${encryptedcode.iv}/${encryptedcode.content}`
    return url

}

const verifyUrlWithCode = (enteredCode, iv, content) => {
    const decryptedcode = decrypt({ iv, content })
    const code = parseInt(decryptedcode)
    return code == enteredCode ?
        true : false

}


module.exports = {
    generateVerificationUrl,
    verifyUrlWithCode
}