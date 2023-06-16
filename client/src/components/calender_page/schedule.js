
import { useState } from 'react'
const Schedule = () => {
  const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']


  return <div className="schedule">
    <div className="header">
      {/* <div className="text-header">My Schedule</div>
      <div className="features-header-container">
        <div className="date-buttons">
          <div className="date">02 - 08 March</div>
          <div className="buttons">
            <div className="left"><i className="fa-solid fa-chevron-left"></i></div>
            <div className="right"><i className="fa-solid fa-chevron-right"></i></div>
          </div>
        </div>
        <div className="new-event">
          <div className="button"><i className="fa-solid fa-plus"></i> New Event</div>
        </div>
      </div> */}

      <div className="date-scale">
        <div className="value">
          <div className="text">Day</div>
          <div className="img"><i className="fa-solid fa-chevron-down"></i></div>
        </div>
        {/* Select Div */}
      </div>
      <div className="date-calenders">
        <div className="date">
          <div className="img"><i class="fa-solid fa-calendar-week"></i></div>
          <div className="text">Oct 15, 2023</div>
        </div>
        {/* Calender Div */}
      </div>
      <div className="slider">
        <div>Slider</div>

      </div>
    </div>
    <div className="wheel-dates">
      <div className="container-wheel">
        {/* <div className="center ch-date"></div> */}
        {
          days.map((day, i) => {
            return <div className={day === '04' ? 'ch-date today selected' : 'ch-date'}>
              <div className="date">
                <span>We</span>
                {day}
              </div>
              <div className="dotes">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

          })
        }
      </div>

    </div>









  </div >
}

export default Schedule;

function left() {

}