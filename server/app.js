const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const compression = require('compression')
const AppError = require('./Errors/classError')
const errorHandler = require('./Errors/errorHandling')
const Events = require('./models/events')
const dotenv = require('dotenv')
const limitReq = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const helmet = require('helmet');
const multer = require('multer');


dotenv.config({ path: './.env' }); //? configuration for dotenv
const app = express();

app.use(express.json())
app.enable('trust proxy')
app.use(morgan('tiny'))
app.use(compression())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(mongoSanitize())
app.use(xssClean())
app.use(hpp())

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })



//? Cookies
app.use(cookieParser()); //? to access a cookie requests

//? Store Session in data base
// const sessionLink = process.env.DATA_BASE_URL.replace('<DATABASENAME>', process.env.DATA_BASE_NAME).replace('<PASSWORD>', process.env.DATA_BASE_PASSWORD)
// const STORE = new SessionStore({
//   uri: sessionLink,
//   collection: 'sessions'
// })

//? set Session
// app.use(session({
//   key: 'client.side',
//   secret: process.env.SESSION_SECRET,
//   saveUninitialized: true,
//   resave: true,
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 100 }, //! 30 Days
//   store: STORE,
// }));


//? setup express message
app.use(async (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  // const events = req.body.events
  // const eventsDB = await Events.create({ events: events })
  // console.log('🚀 ~ eventsDB:', eventsDB)
  // await eventsDB.save()
  next();
});


const limiter = limitReq({
  max: 200,
  windowMs: 1000 * 60 * 60, // 1 Hour
  message: 'Too many requests, try again after one hour'
})


app.use('/auth', limiter)
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.all('*', (req, res, next) => next(new AppError('not found', 404)))
app.use(errorHandler)
module.exports = app
