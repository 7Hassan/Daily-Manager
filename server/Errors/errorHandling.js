
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Network response was not ok'

  // if (err.name == 'ValidationError' || err.name == 'CastError' || err.name == 'MongoServerError') return validationMongoErr(err, res)
  res.status(err.statusCode).send({ message: err.message, status: 'error' })
}
module.exports = errorHandler


//! mongo errors
function validationMongoErr(err, res) {
  if (err.name == 'MongoServerError') return res.status(401).send('User name is used')
  if (err.name == 'CastError') return res.status(401).json('not found')
  res.status(401).send('Error')
}
