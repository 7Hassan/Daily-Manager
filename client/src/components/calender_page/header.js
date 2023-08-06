
import { useMemo, useState, useEffect } from 'react'
import {  useTime } from '../../utils/helpers'
import { format } from 'date-fns';
import { useCalender } from '../../App';
import { CalenderDays } from './datesComponents';



const CalenderContainer = () => {
  const { calender, setCalender } = useCalender()
  const dateRange = calender.dateRange
  const { start, end } = dateRange;
  const [tempDateRange, setTempDateRange] = useState(dateRange)
  const [hideCalender, setHideCalender] = useState(true)
  const scale = useMemo(() => `${format(start, 'dd MMM')} - ${format(end, 'dd MMM')}`, [start, end])
  const apply = () => {
    setHideCalender(true)
    setCalender({ ...calender, dateRange: tempDateRange })
  }

  const cancel = () => {
    setHideCalender(true)
    setTempDateRange(dateRange)
  }

  useEffect(() => setTempDateRange(dateRange), [dateRange]);

  return <>
    <div className="date-calenders" onClick={() => setHideCalender(!hideCalender)}>

      <div className="date">
        {scale}
      </div>
    </div>
    <div className={`calender ${hideCalender ? ' hidden' : ''}`}>
      <div className="calender-container">
        <div className="calender-component">
          <CalenderDays data={{ tempDateRange, setTempDateRange, hidden: hideCalender, start }} />
          <div className="options">
            <button className='btn cancel' onClick={cancel}>Cancel</button>
            <button className='btn apply' onClick={apply}>Apply</button>
          </div>
        </div>
      </div>
    </div >
  </>
}

const TodayHeader = ({ setToday }) => {
  const time = useTime()

  return <>
    <div className="today" onClick={() => setToday([time])}>
      <div className="date">
        <div className="img"><i className="fa-solid fa-calendar-week"></i></div>
        <div className="text">{format(time, 'dd LLL')}</div>
      </div>
    </div>
  </>
}

const Header = ({ Days, setDates }) => {
  return <div className="header">
    <TodayHeader setToday={setDates} />
    <CalenderContainer />
    <div className="slider" onClick={() => setDates(Days)}> Reset </div>
  </div>
};
export default Header;










