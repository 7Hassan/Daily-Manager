
import { useState, useEffect } from 'react'
import { GetDate } from '../../utils/helpers'
import format from 'date-fns/format';



const NavCalender = ({ className, date, setDate }) => {
  const getDate = new GetDate()
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']
  // const now = new Date()

  // const today = format(date, 'dd M yyyy')

  // const [Month, setMonth] = useState(date.getMonth())
  // const [Year, setYear] = useState(date.getFullYear())
  // const monStart = format(new Date(Year, Month), 'EEEEEE')
  // const [customDate, setCustomDate] = useState(date.Date('MMMM yyyy', Month, Year))
  // const [monDays, setMonDays] = useState(date.monDays(Month, Year.'dd'))




  const plusMonth = () => {
    //   if (Month > 12) {
    //     setMonth(1)
    //     setYear(Year + 1)
    //   } else setMonth(Month + 1)
  }

  const minusMonth = () => {
    // if (Month < 0) {
    //   setMonth(12)
    //   setYear(Year - 1)
    // } else setMonth(Month - 1)
  }
  // useEffect(() => {
  //   setCustomDate(date.Date('MMMM yyyy', Month, Year))
  //   setMonDays(date.monDays('dd', Month, Year))
  // }, [Month])



  return <div className={className}>
    <div className="calender-container">
      <div className="calender-component">
        <div className="head">
          <button onClick={() => minusMonth()} ><i className="fa-solid fa-chevron-left"></i></button>
          <div className="text-date">{'customDate'}</div>
          <button onClick={() => plusMonth()}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="dates">
          <div className="week-days">
            {weekDays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mon-days">
            {
              // weekDays.map((weekDay) => weekDay === monStart ? monDays.map((day) => <div className={`${day} ${Month + 1} ${Year}` === today ? 'today mon-day' : 'mon-day'} key={day} > {day}</div >) : <div key={weekDay}></div>)
            }
          </div>
        </div>
        <div className="start-end">
          <div className="start">02/07/2023</div>
          <div className="start">02/07/2023</div>
        </div>
        <div className="options">
          <button className='btn cancel'>Cancel</button>
          <button className='btn apply'>Apply</button>
        </div>
      </div>
    </div>
  </div>
};


export default NavCalender;










