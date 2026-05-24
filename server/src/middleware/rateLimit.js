const rateLimit = require('express-rate-limit')

const createLimiter = (max, windowMinutes = 15) =>
    rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        max,
        message: { message: 'Too many requests, try later again' },
        standardHeaders: true,
        legacyHeaders: false,
        statusCode: 429
    })

const authLimiter = createLimiter(20,15)
const sensitiveLimiter = createLimiter(5,15)

module.exports = {sensitiveLimiter,authLimiter}