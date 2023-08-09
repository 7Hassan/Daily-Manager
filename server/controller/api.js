const User = require('../models/users')
const catchError = require('../Errors/catch')
const helper = require('./helperFunc')
const AppError = require('../Errors/classError')




exports.protectAPI = async (req, res, next) => {
  const { user, time } = await helper.testJwtToken(req, res, next)
  if (!user) return next(new AppError('Please login', 401))
  req.user = user
  next()
}

exports.postEvent = catchError(async (req, res, next) => {
  const { title, description, color, urls, notes, days, time } = req.body
  if (!title || !color || !days || !time) return next(new AppError('Invalid Data Request', 401))
  const user = req.user
  const { events } = user.calender
  const event = { title, description, color, urls, notes, time }
  days.map((day) => {
    const newEvent = { day, evs: [event] }
    user.calender.events.push(newEvent);
  })
  const updatedUser = await user.calender.save();

  res.status(200).json({ success: true, data: updatedUser })
})







exports.getUser = catchError(async (req, res, next) => {
  const user = await User.findOne({ userName: '7hassan' }).select('-_id -createdAt')
  console.log('🚀 ~ user:', user)
  res.status(200).json({ data: user })
})
// exports.oneProducts = catchError(async (req, res, next) => {
//   const data = await Product.findOne({ '_id': req.params.id })
//   res.status(200).send(data)
// })