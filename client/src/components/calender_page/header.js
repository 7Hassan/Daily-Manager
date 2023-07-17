
import { useMemo, useState } from 'react'
import { getStart, getEnd } from '../../utils/helpers'
import { format } from 'date-fns';
import { MonSwiper } from './swipes';



export const Calender = ({ data }) => {
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
  const [calenderDate, setCalenderDate] = useState(new Date());
  return <>
    <div className="head"> {format(calenderDate, 'LLL y')}</div>
    <div className="dates">
      <div className="week-days">
        {weekDays.map((day) => <div key={day}>{day}</div>)}
      </div>
      <MonSwiper data={{ ...data, weekDays, setCalenderDate }} />
    </div>
  </>

}

const CalenderContainer = ({ data }) => {
  const { dateRange, setDateRange } = data
  const [tempDateRange, setTempDateRange] = useState(dateRange)
  const [hideCalender, setHideCalender] = useState(true)
  const tempStart = tempDateRange.start
  const tempEnd = tempDateRange.end


  const apply = () => {
    setHideCalender(true)
    setDateRange(tempDateRange)
  }

  const cancel = () => {
    setHideCalender(true)
    setTempDateRange(dateRange)
  }

  return <>
    <div className="date-calenders" onClick={() => setHideCalender(!hideCalender)}>
      <div className="date">
        <div className="img"><i className="fa-solid fa-calendar-week"></i></div>
        <div className="text">{format(new Date(), 'dd LLL y')}</div>
      </div>
    </div>
    <div className={`calender ${hideCalender ? ' hidden' : ''}`}>
      <div className="calender-container">
        <div className="calender-component">
          <Calender data={{ tempDateRange, setTempDateRange, hideCalender }} />
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
  </>
}

const Header = ({ data }) => {
  const { dateRange, setDates, Days } = data;
  const { start, end } = dateRange;
  const scale = useMemo(() => `${format(getStart(start, end), 'dd')} - ${format(getEnd(start, end), 'dd')} ${format(start, 'MMM')}`, [start, end])
  return <div className="header">
    <div className="date-scale"> {scale} </div>
    <CalenderContainer data={data} />
    <div className="slider" onClick={() => setDates(Days)}> Reset </div>
  </div>
};
export default Header;










