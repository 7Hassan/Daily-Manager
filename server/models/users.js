const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Calender = require('../models/Calender')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
    required: [true, 'User Name is required'],
    minlength: [4, 'User Name must be at least 4 characters'],
    unique: true,
    select: false //? not sending a password only by use select('+password')
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  passwordRemember: {
    type: String,
    required: [true, 'Password Remember is required'],
    select: false
  },
  img: {
    type: String,
    default: 'default.webp'
  },
  jobTitle: {
    type: String,
    required: [true, 'Job Title is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  calender: {
    type: mongoose.Schema.ObjectId,
    ref: 'calenders',
  },
});

//? Hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next() //? password is not change
  // this.userName = await bcrypt.hash(this.userName, 10)
  this.password = await bcrypt.hash(this.password, 10)
  this.passwordRemember = await bcrypt.hash(this.passwordRemember, 10)
  // this.date = Date.now() - 1000
  next()
})

userSchema.methods.isCorrectPass = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword)
}

//? password changed & data updated
// userSchema.methods.isChangedPass = function (dateToken) {
//   const dateUser = parseInt(this.date.getTime() / 1000) //? in S
//   return (dateUser > dateToken)
// }

userSchema.pre(/^find/, async function () {
  this.select("-__v").populate({ path: 'calender', select: "-__v -_id -user" })
})

userSchema.methods.createUser = async function () {
  const calender = await Calender.create({ user: this._id })
  this.calender = calender._id
}


let User = mongoose.model('users', userSchema)
module.exports = User;