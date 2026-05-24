const express = require('express')
const router = express.Router()
const UserController = require('./../controllers/user.controller')
const protect = require('./../middleware/userMiddleware.js')
const {sensitiveLimiter,authLimiter} = require('../middleware/rateLimit.js')

router.post('/register',authLimiter, UserController.register)
router.post('/login', authLimiter, UserController.login)
router.post('/logout',authLimiter, UserController.logout)
router.post('/refresh', UserController.refresh)
router.post('/save', protect,  UserController.save)
router.get('/me', protect, UserController.me)
router.get('/allUser', UserController.getusers)

module.exports = router
