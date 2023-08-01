const User = require('../models/users')
const catchError = require('../Errors/catch')

exports.getUser = catchError(async (req, res, next) => {
  const user = await User.findOne({ userName: '7hassan' }).select('-_id -createdAt')
  console.log('🚀 ~ user:', user)
  res.status(200).json({ data: user })
})
// exports.oneProducts = catchError(async (req, res, next) => {
//   const data = await Product.findOne({ '_id': req.params.id })
//   res.status(200).send(data)
// })