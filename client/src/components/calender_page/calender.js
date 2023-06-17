
import { useState, useEffect } from 'react'
import { getDate } from '../../utils/helpers'
import format from 'date-fns/format';



const NavCalender = ({ className }) => {
  const date = new getDate()
  const now = new Date()

  const today = format(now, 'dd M yyyy')
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']

  const [Month, setMonth] = useState(now.getMonth())
  const [Year, setYear] = useState(now.getFullYear())
  const monStart = format(new Date(Year, Month), 'EEEEEE')
  const [customDate, setCustomDate] = useState(date.Date('MMMM yyyy', Month, Year))
  const [monDays, setMonDays] = useState(date.monthDays('dd', Month, Year))
  const plusMonth = () => {
    if (Month > 12) {
      setMonth(1)
      setYear(Year + 1)
    } else setMonth(Month + 1)
  }

  const minusMonth = () => {
    if (Month < 0) {
      setMonth(12)
      setYear(Year - 1)
    } else setMonth(Month - 1)
  }
  useEffect(() => {
    setCustomDate(date.Date('MMMM yyyy', Month, Year))
    setMonDays(date.monthDays('dd', Month, Year))
  }, [Month])



  return <div className={className}>
    <div className="calender-container">
      <div className="header">
        <div>Today</div>
        <div>This Week</div>
        <div>This Month</div>
      </div>
      <div className="calender-component">
        <div className="head">
          <button onClick={() => minusMonth()} ><i className="fa-solid fa-chevron-left"></i></button>
          <div className="text-date">{customDate}</div>
          <button onClick={() => plusMonth()}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="dates">
          <div className="week-days">
            {weekDays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mon-days">
            {
              weekDays.map((weekDay) => weekDay === monStart ? monDays.map((day) => <div className={`${day} ${Month + 1} ${Year}` === today ? 'today mon-day' : 'mon-day'} key={day} > {day}</div >) : <div key={weekDay}></div>)
            }
          </div>
        </div>
      </div>
    </div>
  </div>
};


export default NavCalender;










