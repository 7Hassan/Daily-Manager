
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, addHours } from 'date-fns';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';



const Clock = ({ evTime, setEvTime }) => {
  const [views, setViews] = useState(['hours'])
  const [status, setStatus] = useState('start')

  const handleClickZone = (zone, sec) => {
    const obj = zone === 'am' ? dayjs(addHours(evTime[sec].$d, -12)) : dayjs(addHours(evTime[sec].$d, 12));
    (status === sec) ? setEvTime({ ...evTime, value: obj, [sec]: obj }) : setEvTime({ ...evTime, [sec]: obj });

  }

  const handleClick = (sec, view) => {
    setViews([view]);
    setStatus(sec);
    setEvTime({ ...evTime, value: evTime[sec] })
  }

  useEffect(() => setEvTime({ ...evTime, [status]: evTime.value }), [evTime.value])
  return <div className="clock">
    <div className="container-clock">
      <div className="start">
        <span className='text'>Start</span>
        <div className="time">
          <div className="hours" >
            <span className={`text ${status === 'start' && views[0] === 'hours' ? 'clicked' : ''}`}
              onClick={() => handleClick('start', 'hours')}>{format(evTime.start.$d, 'hh')}:</span>
          </div>
          <div className="minutes" >
            <span className={`text ${status === 'start' && views[0] === 'minutes' ? 'clicked' : ''}`}
              onClick={() => handleClick('start', 'minutes')}>{format(evTime.start.$d, 'mm')}</span> </div>
          <div className="AM-PM">
            <div className="am" ><span className={`text ${evTime.start.$H < 12 ? 'clicked' : ''}`} onClick={() => handleClickZone('am', 'start')}>AM</span> </div>
            <div className="pm" > <span className={`text ${evTime.start.$H >= 12 ? 'clicked' : ''}`} onClick={() => handleClickZone('pm', 'start')}>PM</span> </div>
          </div>
        </div>
      </div>
      <div className="end">
        <span className='text'>End</span>
        <div className="time">
          <div className="hours">
            <span className={`text ${status === 'end' && views[0] === 'hours' ? 'clicked' : ''}`}
              onClick={() => handleClick('end', 'hours')}>{format(evTime.end.$d, 'hh')}:</span>
          </div>
          <div className="minutes">
            <span className={`text ${status === 'end' && views[0] === 'minutes' ? 'clicked' : ''}`}
              onClick={() => handleClick('end', 'minutes')}>{format(evTime.end.$d, 'mm')}</span> </div>
          <div className="AM-PM">
            <div className="am" ><span className={`text ${evTime.end.$H < 12 ? 'clicked' : ''}`}
              onClick={() => handleClickZone('am', 'end')}>AM</span> </div>
            <div className="pm" > <span className={`text ${evTime.end.$H >= 12 ? 'clicked' : ''}`}
              onClick={() => handleClickZone('pm', 'end')}>PM</span> </div>

          </div>
        </div>
      </div>
    </div >
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <TimeClock value={evTime.value} onChange={(newValue) => setEvTime({ ...evTime, value: newValue })}
        views={views} />
    </LocalizationProvider>
  </div >
};

export default Clock;




















