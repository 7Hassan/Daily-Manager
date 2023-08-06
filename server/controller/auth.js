const User = require('../models/users')
const crypto = require('crypto')
const catchError = require('../Errors/catch')
const AppError = require('../Errors/classError')
const helper = require('./helperFunc')




exports.changEmailVerify = catchError(async (req, res, next) => {
  const { email } = req.body
  const user = req.user
  if (!email) return next(new AppError('Email required', 401))
  if (email == user.email) return next(new AppError('Email is used', 401))
  user.email = email
  const token = await user.createToken('email')
  await user.save()
  const url = `${req.protocol}://${req.get('host')}/auth/signup/verify/${token}`
  new Email(user, url).verify()
  res.status(200).json({ email: user.email })
})

exports.resendEmailVerify = catchError(async (req, res, next) => {
  const user = req.user
  const token = await user.createToken('email')
  await user.save()
  const url = `${req.protocol}://${req.get('host')}/auth/signup/verify/${token}`
  await new Email(req.user, url).verify()
  res.status(200).send('Email send')
})

exports.checkEmail = catchError(async (req, res, next) => {
  const email = req.body.email
  const user = await User.findOne({ email })
  if (user) res.status(200).send(user.firstName)
  else res.status(201).send(false)
})

exports.isEmailConfig = catchError(async (req, res, next) => {
  const { user, time } = await helper.testJwtToken(req, res)
  if (user && !user.isChangedPass(time)) {
    req.user = user
    if (!user.emailConfig) return next()
    req.flash('toast', 'Your Email is confirmed')
    res.status(300).redirect('/')
  } else {
    req.flash('errors', 'You aren\'t Register')
    res.status(401).redirect('/')
  }
})

exports.protectAuth = async (req, res, next) => {
  const { user, time } = await helper.testJwtToken(req, res, next)
  if (!user) return next()
  next(new AppError('You are register', 401))
}

exports.signUp = catchError(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
    jobTitle: req.body.jobTitle,
    email: req.body.email,
  })
  await newUser.createUser()
  await newUser.save()
  const jwtToken = helper.createJwtToken(newUser._id)
  const user = await User.findById({ _id: newUser._id })
  res.cookie('jwt', jwtToken, helper.cookieOptions).status(200).json({ success: true, data: user })
})

exports.verify = async (req, res, next) => {
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
  const user = await User.findOne({ emailToken: token, expEmailToken: { $gt: Date.now() } })
  if (!user) return next(new AppError('Email Date is expired', 404))
  user.emailConfig = true
  user.emailToken = undefined
  user.expEmailToken = undefined
  await user.save()
  req.flash('success', 'verification Email')
  res.status(200).redirect('/')
  helper.sendSocket('emailConfirmed')
  const url = `${req.protocol}://${req.get('host')}`
  new Email(req.user, url).welcome()
}

exports.login = catchError(async (req, res, next) => {
  //? 1) if email & password are send
  const { userName, password } = req.body
  if (!userName) return next(new AppError('User Name required', 401))
  if (!password) return next(new AppError('Password required', 401))
  if (password.length < 8) return next(new AppError('Password is incorrect', 401))

  //? 2) if user is exist & correct password
  const user = await User.findOne({ userName }).select('+password')
  if (!user) return next(new AppError('User Name is incorrect', 401))
  const isMatch = await user.isCorrectPass(password, user.password)
  if (!isMatch) return next(new AppError('Password is incorrect', 401))

  //? 3) create a token send a success response
  const jwtToken = await helper.createJwtToken(user._id)
  res.cookie('jwt', jwtToken, helper.cookieOptions).status(200).json({ success: true, data: user })
})

exports.forgetPass = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return next(new AppError('Email is incorrect.', 401))
  const token = user.createToken('password')
  await user.save()
  const url = `${req.protocol}://${req.get('host')}/auth/resetpassword/${token}`
  await new Email(user, url).resetPass()
  res.status(201).send('Email sent')
})

exports.protect = catchError(async (req, res, next) => {
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
  //? 1) Get a user based on token & expired date
  const user = await User.findOne({ passwordToken: token, expPasswordToken: { $gt: Date.now() } }).select('password')
  if (!user) return next(new AppError('Page is not found or Email Date is expired', 404))
  req.user = user
  next()
})
exports.resetPage = catchError(async (req, res, next) => {
  res.render('user/resetPass', {
    title: 'Reset password',
    errors: req.flash('errors'),
    warning: req.flash('warning'),
    success: req.flash('success'),
    toast: req.flash('toast'),
  });
})

exports.resetPassword = catchError(async (req, res, next) => {
  const user = req.user
  const { password } = req.body
  if (!password) return next(new AppError('Password is required', 401))
  user.password = password
  user.passwordToken = undefined
  user.expPasswordToken = undefined
  await user.save()
  res.status(200).json({ redirect: '/auth/login' })
})
