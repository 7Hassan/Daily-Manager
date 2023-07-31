//! Error uncaught Exception
process.on('uncaughtException', (err) => {
  console.error('⛔ ' + err.name, err.message, err.stack)
  process.exit(1)
})

const mongoose = require('mongoose')
const app = require('./app')

const DBLink = 'mongodb://localhost:27017/eventsDB'
const port = process.env.PORT

//? connect with DataBase
mongoose.connect(DBLink).then(() => console.log('✅ connect with DataBase'))
//? Run server                                                                                                     
const server = app.listen(port, () => console.log(`✅ app listening on port ${port}`))

//! Error with connection with mongo                
process.on('unhandledRejection', (err) => {
  console.error('🚨 ' + err.name, err.message)
  server.close(() => process.exit(1))
})
