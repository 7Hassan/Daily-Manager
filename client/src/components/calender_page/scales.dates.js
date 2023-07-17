

import { useState, useEffect } from "react";
import { timeToPx } from "../../utils/helpers";
import { format, isToday } from "date-fns";


const Scales = ({ dates }) => (dates.length > 1) ? Days(dates) : isToday(dates[0]) ? Today() : Day(dates[0])
export default Scales;

const Event = () => {
  let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVW6tRa_qW83fppIYIFced0ZU96MQixbuoag8FH9umQQ&s'
  // img = null;
  return <div className="event-dev">
    <div className="event-container">
      <div className="time">
        <div className="start">08:00</div>
        <div className="remaining">2h 34m</div>
      </div>
      <div className="details">
        {img && <img src={img} alt='img' />}
        <div className="inf">
          <div className="title">Web development</div>
          <div className="disc">Course Web development</div>
        </div>
      </div>
    </div>
    <div className="event-bar">
      <div className="counter">0h 30m</div>
      <div className="bar"></div>
      <div className="full-time">2h 56m</div>
    </div>
  </div >
}

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
        {
          hours.map((hour) => {
            return (
              <div className="hour" key={hour}>
                <div className="time">{hour}</div>
                <div className="container"></div>
              </div>
            )
          })
        }
        <Event />
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



const DaysEvent = ({ data }) => {
  const evs = Array.from({ length: 4 })
  return <div className="event">
    <div className="ev-details">
      <div className="title">Web Design</div>
      <div className="time">23:40</div>
    </div>
    {evs && <div className="other-same-time">
      {
        evs.map((ev, i) => i === 2 ? <span className="text">+</span> : <span></span>)
      }
    </div>
    }
  </div >
}

const Days = (days) => {
  return <div className="days">
    {
      days.map((day) => <div key={day} className={isToday(day) ? 'today' : ''}>
        <div className="date">  {format(day, 'dd iii')}</div>
        <div className="events">
          <DaysEvent />
        </div>
      </div>
      )
    }
  </div>
}






