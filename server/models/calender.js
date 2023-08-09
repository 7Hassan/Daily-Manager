const mongoose = require('mongoose')

const calenderSchema = new mongoose.Schema({
  dateRange: {
    start: {
      type: Date,
      default: new Date(),
    },
    end: {
      type: Date,
      default: new Date(),
    },
  },
  events: [{
    day: {
      type: Date,
      required: [true, 'Day of event is required'],
    },
    evs: [{
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
        enum: ['#E27AFB', '#17D2A0', '#0077FC', '#34A9DC', '#6658d3', '#5100B6', '#DDB372', '#E06C2A'],
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
    ref: 'users',
    select: false

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


const Calendar = mongoose.model('calenders', calenderSchema)
module.exports = Calendar