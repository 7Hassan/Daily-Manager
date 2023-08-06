const express = require('express')
const limitReq = require('express-rate-limit')
const Router = express.Router()
const func = require('../controller/auth')


// Router.route('/signup/check').patch(func.checkEmail)
// Router.route('/signup/verify').get(func.isEmailConfig, func.verifyPage).post(func.isEmailConfig, limiter, func.changEmailVerify).patch(func.isEmailConfig, limiter, func.resendEmailVerify)
// Router.route('/signup/verify/:token').get(func.verify)


Router.use(func.protectAuth)
Router.route('/signup').post(func.signUp)
Router.route('/login').post(func.login)
// Router.route('/login').post(func.logIn).patch(limiter, func.forgetPass)
// Router.route('/resetpassword/:token').get(func.protect, func.resetPage).post(func.protect, func.resetPassword)
module.exports = Router