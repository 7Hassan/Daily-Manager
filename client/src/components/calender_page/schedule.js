
import NavCalender from "./pop.calender";
import { useState, useEffect } from "react";
import { changeClass, GetDate, getStart, getEnd } from "../../utils/helpers";
import { format } from 'date-fns';
import { WheelSwiper } from './swipes'
import Scales from "./scales.dates";





const Schedule = ({ data }) => {
  const { dateRange } = data;
  const { start, end } = dateRange;
  const { days } = new GetDate(start, end);
  const Days = days()
  const [classN, setClassN] = useState('calender hidden')
  const [dates, setDates] = useState(Days)

  useEffect(() => { setDates(Days) }, [dateRange])

  return <div className="schedule">
    <div className="header">
      <NavCalender data={{ ...data, classN, setClassN }} />
      <div className="date-scale">
        {format(getStart(start, end), 'dd')} - {format(getEnd(start, end), 'dd')} {format(start, 'MMM')}
      </div>
      <div className="date-calenders" onClick={() => changeClass(classN, setClassN, 'calender', 'calender hidden')}>
        <div className="date">
          <div className="img"><i className="fa-solid fa-calendar-week"></i></div>
          <div className="text">{format(new Date(), 'dd LLL y')}</div>
        </div>
      </div>
      <div className="slider">
        <div onClick={() => setDates(Days)}> Reset</div>
      </div>
    </div>
    <div className="wheel-dates">
      <div className="inner-slider">
        <WheelSwiper Days={Days} setDates={setDates} />
      </div >
    </div >
    <div className="table">
      <div className="table-container">
        <Scales dates={dates} />
      </div>
    </div>
  </div >
}

export default Schedule;









