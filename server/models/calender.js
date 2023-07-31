const mongoose = require('mongoose')

const calenderSchema = new mongoose.Schema({
  dateRange: {
    start: {
      type: Date,
      default: new Date(),
    },
    start: {
      type: Date,
      default: new Date(),
    },
  },
  events: [{
    day: {
      type: Date,
      required: [true, 'Day of event is required'],
    },
    ev: [{
      title: {
        type: String,
        required: [true, 'Title of event is required'],
      },
      description: {
        type: String,
      },
      notes: {
        type: String,
      },
      color: {
        type: String,
        required: [true, 'Color of event is required'],
      },
      urls: [
        {
          name: { type: String },
          link: { type: String }
        }
      ],
      time: {
        start: {
          type: Date,
          required: [true, 'Time of event is required'],
        },
        end: {
          type: Date,
          required: [true, 'Time of event is required'],
        }
      }
    }],

  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  }
},
  //? to activate virtuals
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

//? get user linked with this cart
calenderSchema.virtual('author', {
  ref: 'users',
  localField: 'user',
  foreignField: '_id',
  justOne: true
})


const Calendar = mongoose.model('calender', calenderSchema)
module.exports = Calendar