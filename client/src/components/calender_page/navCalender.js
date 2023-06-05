
import { useState } from 'react'


const NavCalender = () => {
  const [weekDays, setweekDays] = useState(['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'])
  const [monDays, setMonDays] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
  const [monDayClass, setMonDayClass] = useState('mon-day')

  return <div className='calender'>
    <div className="calender-container">
      <div className="header">
        <div>Today</div>
        <div>This Week</div>
        <div>This Month</div>
      </div>
      <div className="calender-component">
        <div className="head">
          <button><i class="fa-solid fa-chevron-left"></i></button>
          <div className="text-date">December 2020</div>
          <button><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="dates">
          <div className="week-days">
            {weekDays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mon-days">
            {monDays.map((day) => <div className={monDayClass} key={day}>{day}
              {/* <div className="dot-event">
                <span></span>
                <span></span>
                <span></span>
              </div> */}
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>
};


export default NavCalender;
