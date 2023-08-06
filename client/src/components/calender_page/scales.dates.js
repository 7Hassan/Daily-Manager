

import { timeToMins, useTime, GetDate } from "../../utils/helpers";
import { format, isToday, isSameDay } from "date-fns";
import { useCalender } from '../../App';
import { EventSwipes } from "./swipes";
import { useState } from "react";
// const Scales = ({ dates }) => (dates.length > 1) ? Days(dates)
//   : isToday(dates[0]) ? Today() : Day(dates[0])
const Scales = ({ dates }) => (dates.length > 1) ? Days(dates) : Today(dates[0])
export default Scales;




const wrapComponent = Component => {
  return ({ events, day }) => {
    events.sort((a, b) => a.time.start - b.time.start);
    const wrapEvents = evsIntersect(events)
    return wrapEvents.map((evs, i) => {
      const top = timeToMins(evs[0].time.start);
      return < Component key={evs[0].id} events={evs} top={top} day={day} />
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

const Today = (day) => {
  const { calender } = useCalender()
  const { events } = calender
  const getDate = new GetDate(day)
  const hoursDay = getDate.dayHours()
  const dayEvents = events.filter(obj => isSameDay(obj.day, day))[0]
  const hours = hoursDay.map(hour => format(hour, 'hh a'));
  const WrapEvents = wrapComponent(EventSwipes)

  return (
    <div className="day">
      <div className="day-date">{format(day, 'dd iii')}</div>
      <div className="day-container">
        {isToday(day) && <Cursor />}
        <div className="hours">        {
          hours.map((hour) => {
            return (
              <div className="hour" key={hour}>
                <div className="time">{hour}</div>
                <div className="container"></div>
              </div>
            )
          })
        }
        </div>

        <div className="container-swipes-evs">
          {dayEvents && <WrapEvents events={dayEvents.evs} day={day} />}
        </div>
      </div>
    </div>
  )
}

const PopEvent = ({ event }) => {
  const { start, end } = event.time
  const { title, description, notes, urls, color } = event

  return <div style={{ borderColor: color, backgroundColor: color }}
    className={`event-pop event-st show`}>
    <div className="event-container" onClick={e => e.stopPropagation()}>
      <div className="time">
        <div className="start">{format(start, 'hh:mm aa')}</div>
        <div className="remaining">{format(end, 'hh:mm aa')}</div>
      </div>
      <div className="inf">
        <div className="title">{title}</div>
        <div className="disc">{description}</div>
        <div className="disc notes">{notes}</div>
        <div className="urls">
          {urls.map((url, i) => {
            return <div key={`${i}${url.name}`}>
              <a target={'_blank'}
                rel="noopener noreferrer" href={url.link}>{url.name}</a>
            </div>
          })}
        </div>
      </div>
    </div>
  </div >
}

// const Day = (day) => {
//   const hours = Array.from({ length: 24 }, (_, index) => `${index > 9 ? index : '0' + index}:00`)
//   const { calender } = useCalender()
//   const { events } = calender
//   const getDate = new GetDate(new Date())
//   const todayEvents = events.filter(obj => isToday(obj.day))[0]
//   const hoursDay = getDate.dayHours()
//   const hours = hoursDay.map(hour => format(hour, 'hh a'));
//   const WrapEvents = wrapComponent(EventSwipes)

//   return (
//     <div className="day">
//       <div className="day-date">{format(day, 'dd iii')}</div>
//       <div className="day-container">
//         <div className="event">
//           <div className="event-container">
//             Event
//           </div>
//         </div>
//         {
//           hours.map((hour) => {
//             return (
//               <div className="hour" key={hour}>
//                 <div className="time">{hour}</div>
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }


const Event = ({ event, id, setId }) => {
  const { start, end } = event.time
  const { title, description, notes, urls, color } = event
  const clicked = id === event.id
  const handleClick = (e) => {
    e.stopPropagation()
    setId(event.id)
  }
  return <div className={`event ${clicked ? 'clicked' : ''}`}
    onClick={(e) => handleClick(e)} style={clicked ? { backgroundColor: color } : {}}>
    <span className="sp-ev-color" style={{ backgroundColor: color }}></span>
    <div className="title">{title}</div>
    <div className="time-ev" >{format(start, 'hh:mm aa')}</div>
  </div >
}


const Days = (days) => {
  const { calender } = useCalender()
  const { events } = calender
  const [evId, setEvId] = useState(null)

  return <div className="days" onClick={() => setEvId(null)}>
    {
      days.map((day) => {
        const dayEvents = events.filter(obj => isSameDay(obj.day, day))[0]
        const evs = dayEvents?.evs
        evs?.sort((a, b) => a.time.start - b.time.start);
        const event = evs?.find(event => event.id === evId)

        return <div key={day} className={isToday(day) ? 'today' : ''}>
          {event && <PopEvent event={event} />}

          <div className="date">{format(day, 'dd iii')}</div>
          <div className="events">
            {dayEvents && dayEvents.evs.map((ev) => <Event key={ev.id}
              event={ev} id={evId} setId={setEvId} />)}
          </div>
        </div>
      })
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