const express = require('express')
const Router = express.Router()
const funcs = require('../controller/api')

Router.route('/user')
  .get(funcs.getUser)
// .post(funcs.postUser)
// .delete(funcs.deleteUser)

// Router.route('/events')
//   .get(funcs.getEvents)

module.exports = Router






