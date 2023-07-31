const express = require('express')
const Router = express.Router()
const funcs = require('../controller/api')

// Router.route('/calender')
//   .get(funcs.getCalender)
//   .post(funcs.postCalender)
//   .delete(funcs.deleteCalender)

Router.route('/events')
  .get(funcs.getEvents)

module.exports = Router






