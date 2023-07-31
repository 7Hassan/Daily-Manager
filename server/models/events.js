const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
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

  }]
})



const Events = mongoose.model('events', eventsSchema)
module.exports = Events