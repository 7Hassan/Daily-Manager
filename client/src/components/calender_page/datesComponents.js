
import dayjs from 'dayjs';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, addHours } from 'date-fns';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { MonsSwiper } from './swipes';
import { getStart, getEnd } from '../../utils/helpers'


export const Clock = ({ evTime, setEvTime }) => {
  const evTimeObj = { start: dayjs(evTime.start), end: dayjs(evTime.end) }

  const [clock, setClock] = useState({ time: evTimeObj.start, views: ['hours'], status: 'start' })
  const handleClick = (sec, view) => setClock({ time: evTimeObj[sec], views: [view], status: sec });
  const handleClickZone = (zone, sec) => {
    const obj = (zone === 'am') ? dayjs(addHours(evTimeObj[sec].$d, -12)) : dayjs(addHours(evTimeObj[sec].$d, 12));
    setEvTime({ ...evTime, [sec]: obj.$d })
    if (clock.status === sec) setClock({ ...clock, time: obj })
  }
  const handleChange = (time) => {
    setClock({ ...clock, time: time })
    setEvTime({ ...evTime, [clock.status]: time.$d })
  }
  return <div className="clock">
    <div className="container-clock">
      <div className="start">
        <span className='text'>Start</span>
        <div className="time">
          <div className="hours" >
            <span className={`text ${clock.status === 'start' && clock.views[0] === 'hours' ? 'clicked' : ''}`}
              onClick={() => handleClick('start', 'hours')}>{format(evTimeObj.start.$d, 'hh')}:</span>
          </div>
          <div className="minutes" >
            <span className={`text ${clock.status === 'start' && clock.views[0] === 'minutes' ? 'clicked' : ''}`}
              onClick={() => handleClick('start', 'minutes')}>{format(evTimeObj.start.$d, 'mm')}</span> </div>
          <div className="AM-PM">
            <div className="am" ><span className={`text ${evTimeObj.start.$H < 12 ? 'clicked' : ''}`}
              onClick={() => handleClickZone('am', 'start')}>AM</span> </div>
            <div className="pm" > <span className={`text ${evTimeObj.start.$H >= 12 ? 'clicked' : ''}`}
              onClick={() => handleClickZone('pm', 'start')}>PM</span> </div>
          </div>
        </div>
      </div>
      <div className="end">
        <span className='text'>End</span>
        <div className="time">
          <div className="hours">
            <span className={`text ${clock.status === 'end' && clock.views[0] === 'hours' ? 'clicked' : ''}`}
              onClick={() => handleClick('end', 'hours')}>{format(evTimeObj.end.$d, 'hh')}:</span>
          </div>
          <div className="minutes">
            <span className={`text ${clock.status === 'end' && clock.views[0] === 'minutes' ? 'clicked' : ''}`}
              onClick={() => handleClick('end', 'minutes')}>{format(evTimeObj.end.$d, 'mm')}</span> </div>
          <div className="AM-PM">
            <div className="am" ><span className={`text ${evTimeObj.end.$H < 12 ? 'clicked' : ''}`}
              onClick={() => handleClickZone('am', 'end')}>AM</span> </div>
            <div className="pm" > <span className={`text ${evTimeObj.end.$H >= 12 ? 'clicked' : ''}`}
              onClick={() => handleClickZone('pm', 'end')}>PM</span> </div>

          </div>
        </div>
      </div>
    </div >
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <TimeClock value={clock.time} onChange={(newTime) => handleChange(newTime)} views={clock.views} />
    </LocalizationProvider>
  </div >
};


export const CalenderDays = ({ data }) => {
  const { start, end } = data.tempDateRange
  const weekDays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
  const [calenderDate, setCalenderDate] = useState(start);

  return <>
    <div className="head"> {format(calenderDate, 'LLL y')}</div>
    <div className="dates">
      <div className="week-days">
        {weekDays.map((day) => <div key={day}>{day}</div>)}
      </div>
      <MonsSwiper data={{ ...data, setCalenderDate }} />
    </div>
    <div className="start-end">
      <div className="start">{format(getStart(start, end), 'dd/LL/y')}</div>
      <div className="end">{format(getEnd(start, end), 'dd/LL/y')}</div>
    </div>
  </>

}















