
import { useState, useEffect } from 'react'
import { GetDate, NextDate, getStart, getEnd } from '../../utils/helpers'
import { format, isToday, isSameDay, isBefore, isAfter } from 'date-fns';



const NavCalender = (props) => {
  const { className, date, setDate, start, setStart, end, setEnd } = props;
  const { monDays } = new GetDate(date)
  const month = monDays()
  const [status, setStatus] = useState('start')
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']

  const handleClickButton = (direction) => {
    const { Month } = new NextDate(date, direction)
    setDate(Month)
  }

  const handleClickDate = (day) => {
    setEnd(day)
    if (status !== 'start') return setStatus('start')
    setStart(day)
    setStatus('end')
  }

  const handleMouseOver = (day) => (status === 'end') ? setEnd(day) : null
  const handleMouseLeave = () => (status === 'end') ? setEnd(start) : end
  useEffect(() => setStatus('start'), [className])






  return <div className={className}>
    <div className="calender-container">
      <div className="calender-component">
        <div className="head">
          <button onClick={() => handleClickButton('-')} ><i className="fa-solid fa-chevron-left"></i></button>
          <div className="text-date">{format(date, 'LLL y')}</div>
          <button onClick={() => handleClickButton('+')}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="dates">
          <div className="week-days">
            {weekDays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mon-days" onMouseLeave={handleMouseLeave}>
            {
              weekDays.map((day) => {
                const firstDayOfMonth = format(month[0], 'iiiiii')
                if (day !== firstDayOfMonth) return < div key={day} ></div>
                else return month.map((day) => {
                  const dayNum = format(day, 'dd')
                  const checkSame = isSameDay(day, start) || isSameDay(day, end)

                  const checkBetween = isBefore(day, getEnd(start, end)) && isAfter(day, getStart(start, end))


                  let className = isToday(day) ? 'today mon-day' : 'mon-day'
                  className += checkSame ? ' selected' : checkBetween ? ' select' : '';
                  return <div className={className} key={day} onMouseOver={() => handleMouseOver(day)} onClick={() => handleClickDate(day)} > {dayNum}</div >
                })
              })
            }
          </div>
        </div>
        <div className="start-end">
          <div className="start">{format(getStart(start, end), 'dd/LL/y')}</div>
          <div className="end">{format(getEnd(start, end), 'dd/LL/y')}</div>
        </div>
      </div>
    </div>
  </div >
};
export default NavCalender;










