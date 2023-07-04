

import { useState, useEffect } from "react";
import { timeToPx } from "../../utils/helpers";
import { format, isToday } from "date-fns";


const Scales = ({ dates }) => (dates.length > 1) ? Days(dates) : isToday(dates[0]) ? Today() : Day(dates[0])
export default Scales;




const Today = () => {
  const hours = Array.from({ length: 24 }, (_, index) => `${index > 9 ? index : '0' + index}:00`)
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const sc = format(time, 's')
    const waiting = (60 - sc) * 1000
    const interval = setInterval(() => setTime(new Date()), waiting)
    return () => clearInterval(interval)
  }, [time])

  return (
    <div className="day">
      <div className="day-date">{format(new Date(), 'dd iii')}</div>
      <div className="day-container">
        <div className="cursor" style={{ top: `${timeToPx(time)}px` }}>
          <div className="point">{format(time, 'm')}</div>
        </div>
        <div className="event">
          <div className="event-container">
            Event
          </div>
        </div>
        {
          hours.map((hour) => {
            return (
              <div className="hour" key={hour}>
                <div className="time">{hour}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}



const Day = (day) => {
  const hours = Array.from({ length: 24 }, (_, index) => `${index > 9 ? index : '0' + index}:00`)

  return (
    <div className="day">
      <div className="day-date">{format(day, 'dd iii')}</div>
      <div className="day-container">
        <div className="event">
          <div className="event-container">
            Event
          </div>
        </div>
        {
          hours.map((hour) => {
            return (
              <div className="hour" key={hour}>
                <div className="time">{hour}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}



const Days = (days) => {
  return <div className="days">
    {days.map((day) => <div key={day} className={isToday(day) ? 'today' : ''}>
      <div className="date">  {format(day, 'dd iii')}</div>
      <div className="events">
        <div className="event">
          <div className="title">Web Design</div>
          <div className="time">23:40</div>
        </div>
        <div className="event">
          <div className="title">Web Design</div>
          <div className="time">23:40</div>
        </div>
      </div>
    </div>
    )}
  </div>
}






