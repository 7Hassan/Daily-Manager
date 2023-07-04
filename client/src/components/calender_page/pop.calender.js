
import { useState, useEffect } from 'react'
import { getStart, getEnd } from '../../utils/helpers'
import { format } from 'date-fns';
import { MonSwiper } from './swipes';



const NavCalender = ({ data }) => {
  const { classN, setClassN, dateRange, setDateRange } = data;
  const [tempDateRange, setTempDateRange] = useState(dateRange)
  const [calenderDate, setCalenderDate] = useState(new Date())
  const tempStart = tempDateRange.start
  const tempEnd = tempDateRange.end
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']


  useEffect(() => setTempDateRange(dateRange), [dateRange])
  const apply = () => {
    setDateRange(tempDateRange)
    setClassN('calender hidden')
  }
  const cancel = () => {
    setTempDateRange(dateRange)
    setClassN('calender hidden')
  }

  return <div className={classN}>
    <div className="calender-container">
      <div className="calender-component">
        <div className="head"> {format(calenderDate, 'LLL y')}</div>
        <div className="dates">
          <div className="week-days">
            {weekDays.map((day) => <div key={day}>{day}</div>)}
          </div>
          <MonSwiper data={{ ...data, weekDays, tempDateRange, setTempDateRange, setCalenderDate }} />
        </div>
        <div className="start-end">
          <div className="start">{format(getStart(tempStart, tempEnd), 'dd/LL/y')}</div>
          <div className="end">{format(getEnd(tempStart, tempEnd), 'dd/LL/y')}</div>
        </div>
        <div className="options">
          <button className='btn cancel' onClick={cancel}>Cancel</button>
          <button className='btn apply' onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  </div >
};
export default NavCalender;










