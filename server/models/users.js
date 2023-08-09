const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const validator = require('validator')
const Calender = require('../models/Calender')


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  userName: {
    type: String,
    required: [function () { return this.role === 'user' }, 'Email is required'],
    minlength: [4, 'User Name must be at least 4 characters'],
    maxlength: 50,
    unique: true,
    select: false
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'test'],
    default: 'user'
  },
  email: {
    type: String,
    required: [function () { return this.role === 'user' }, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid'
    }
  },
  image: {
    type: String,
    default: 'default.webp'
  },
  jobTitle: {
    type: String,
    required: [true, 'Job Title is required'],
    minlength: 2,
    maxlength: 50
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  verify: {
    type: Object,
    default: null,
    select: false
  },
  calender: {
    type: mongoose.Schema.ObjectId,
    ref: 'calenders',
  },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.isCorrectPass = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword)
}

userSchema.pre(/^find/, async function () {
  this.select("-__v").populate({ path: 'calender', select: "-__v" })
})

userSchema.methods.createUser = async function () {
  const calender = await Calender.create({ user: this._id })
  this.calender = calender._id
}


let User = mongoose.model('users', userSchema)
module.exports = User;