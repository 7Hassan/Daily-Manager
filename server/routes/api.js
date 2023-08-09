const express = require('express')
const Router = express.Router()
const func = require('../controller/api')


Router.use(func.protectAPI)

Router.route('/calender').put(func.postEvent)

module.exports = Router






