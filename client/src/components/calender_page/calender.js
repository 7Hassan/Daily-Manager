
import { useState, useEffect } from 'react'
import { GetDate, NextDate } from '../../utils/helpers'
import { format, isToday, isSameDay, isBefore, isAfter } from 'date-fns';



const NavCalender = ({ className, date, setDate }) => {
  const { monDays } = new GetDate(date)
  const [month, setMonth] = useState(monDays())
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']
  const handleClick = (direction) => {
    const { Month } = new NextDate(date, direction)
    setDate(Month)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMonth(monDays), [date])

  const [start, setStart] = useState(date)
  const [end, setEnd] = useState(date)
  const [status, setStatus] = useState('start')

  const handleClickDate = (day) => {
    setEnd(day)
    if (status !== 'start') return setStatus('start')
    setStart(day)
    setStatus('end')
  }


  useEffect(() => {
    if (isBefore(end, start)) {
      setStart(end)
      setEnd(start)
    }
  }, [start, end])

  return <div className={className}>
    <div className="calender-container">
      <div className="calender-component">
        <div className="head">
          <button onClick={() => handleClick('-')} ><i className="fa-solid fa-chevron-left"></i></button>
          <div className="text-date">{format(date, 'LLL y')}</div>
          <button onClick={() => handleClick('+')}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="dates">
          <div className="week-days">
            {weekDays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mon-days">
            {
              weekDays.map((day) => {
                const firstDayOfMonth = format(month[0], 'iiiiii')
                if (day !== firstDayOfMonth) return < div key={day} ></div>
                else return month.map((day) => {
                  const dayNum = format(day, 'dd')
                  const checkSame = isSameDay(day, start) || isSameDay(day, end)
                  const checkBetween = isBefore(day, end) && isAfter(day, start)
                  let className = isToday(day) ? 'today mon-day' : 'mon-day'
                  className += checkSame ? ' selected' : checkBetween ? ' select' : '';
                  return <div className={className} key={day} onClick={e => handleClickDate(day)} > {dayNum}</div >
                })
              })
            }
          </div>
        </div>
        <div className="start-end">
          <div className="start">{format(start, 'dd/LL/y')}</div>
          <div className="end">{format(end, 'dd/LL/y')}</div>
        </div>
        <div className="options">
          <button className='btn cancel'>Cancel</button>
          <button className='btn apply'>Apply</button>
        </div>
      </div>
    </div>
  </div >
};
export default NavCalender;










