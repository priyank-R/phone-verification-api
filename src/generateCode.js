const generateRandomVerificationCode = async() => {
    return Math.floor(Math.random() * 100000)
}

module.exports = generateRandomVerificationCode