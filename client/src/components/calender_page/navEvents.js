
import { useState } from 'react'

const NavEvents = () => {
  const [timeEvent, setTimeEvent] = useState(0);
  // const [classEvent, setClassEvent] = useState('box-selection')
  time(timeEvent, setTimeEvent)
  return <div className="today-events">
    <div className="event-container">
      <div className="header">
        Today Events
      </div>
      <div className="events">
        <div className="container-ev">
          <div className="event" >
            <div style={{ width: timeEvent + '%' }} className="hover"></div>
            <div className="time">
              08:00
            </div>
            <div className="info">
              <div className="title">Web Development Web DevelopmentWeb DevelopmentWeb Development</div>
              <div className="remaining-time"> 1h 33m</div>
            </div>
            <div className="bar" onClick={(e) => console.log(e.target)} >
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div className="box-selection">
            <button className='btn'>Join Event</button>
            <button className='btn'>Ignore</button>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default NavEvents;

function time(value, setValue) {
  setInterval(() => {
    value >= 100 ? clearInterval() : setValue(value = value + 1)
  }, 2000)
}
