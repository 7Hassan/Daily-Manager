
import { useState, useEffect, useMemo } from "react";
import { eachDayOfInterval } from 'date-fns';
import { WheelSwiper } from './swipes'
import Scales from "./scales.dates";
import Header from "./header";
import { useCalender } from '../../App';




const Schedule = () => {
  const { calender } = useCalender()
  const { start, end } = calender.dateRange;
  const Days = useMemo(() => eachDayOfInterval({ start, end }), [start, end])
  const [dates, setDates] = useState(Days)
  useEffect(() => setDates(Days), [Days])

  return <div className="schedule">
    <Header Days={Days} setDates={setDates} />
    <WheelSwiper Days={Days} setDates={setDates} />
    <div className="table">
      <div className="table-container">
        <Scales dates={dates} />
      </div>
    </div>
  </div >
}

export default Schedule;









