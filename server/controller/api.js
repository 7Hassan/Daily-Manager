const Events = require('../models/events')
const catchError = require('../Errors/catch')

exports.getEvents = catchError(async (req, res, next) => res.status(200).send(await Events.find({})))
// exports.oneProducts = catchError(async (req, res, next) => {
//   const data = await Product.findOne({ '_id': req.params.id })
//   res.status(200).send(data)
// })