

import { timeToMins, useTime, GetDate } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { useCalender } from "../../pages/calender";
import { EventSwipes } from "./swipes";

const Scales = ({ dates }) => (dates.length > 1) ? Days(dates) : isToday(dates[0]) ? Today() : Day(dates[0])
export default Scales;




const wrapComponent = Component => {
  return ({ events }) => {
    events.sort((a, b) => a.time.start - b.time.start);
    const wrapEvents = evsIntersect(events)
    return wrapEvents.map((evs, i) => {
      const top = timeToMins(evs[0].time.start);
      return < Component key={evs[0].title + i} events={evs} top={top} />
    })
  }
}

const Cursor = () => {
  const time = useTime()
  return <>
    <div className="cursor" style={{ top: `${timeToMins(time)}px` }}>
      <div className="point">{format(time, 'm')}</div>
    </div>
  </>
}

const Today = () => {
  const { calender } = useCalender()
  const { events } = calender
  const getDate = new GetDate(new Date())
  const todayEvents = events.filter(event => isToday(event.day))[0]
  const hoursDay = getDate.dayHours()
  const hours = hoursDay.map(hour => format(hour, 'hh a'));
  const WrapEvents = todayEvents?.evs ? wrapComponent(EventSwipes) : null

  return (
    <div className="day">
      <div className="day-date">{format(new Date(), 'dd iii')}</div>
      <div className="day-container">
        <Cursor />
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

        <div className="container-swipes-evs">
          {WrapEvents && <WrapEvents events={todayEvents.evs} />}
        </div>
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
        evs.map((ev, i) => i === 2 ? <span key={ev} className="text">+</span> : <span></span>)
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






function evsIntersect(events) {
  let wrapEvents = [], evsIntersect = [], isIntersect = true;
  events.map((event, i) => {
    for (let j = 0; j < i; j++) {
      const start = event.time.start;
      const end = events[j].time.end;
      isIntersect = start < end
      if (isIntersect) break;
    }
    if (isIntersect) evsIntersect.push(event)
    else {
      wrapEvents.push(evsIntersect)
      evsIntersect = []
      evsIntersect.push(event)
    }

  })
  // if (evsIntersect.length > 0) wrapEvents.push(evsIntersect)
  if (isIntersect) wrapEvents.push(evsIntersect)
  return wrapEvents;
}