

import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';



const Clock = () => {
  const time = format(new Date(), 'yyyy-MM-dd H:mm')

  const [start, setStart] = useState(dayjs(time))

  const [end, setEnd] = useState(dayjs(time))
  const [value, setValue] = useState(dayjs(time))
  const [check, setCheck] = useState(true)
  const [views, setViews] = useState(['hours'])
  console.log('🚀 ~ start:', start.$H)
  // console.log('🚀 ~ value:', value.$H)


  const handleClick = (e) => {
    // ch ? setValue(start) : setValue(end)
    // if (value) setValue(value);
    // setCheck(ch)
    if (e.target) e.target.className += ' clicked'
  }


  const handleChange = (value) => {
    setValue(value)
    check ? setStart(value) : setEnd(value)
  }



  return <div className="clock">
    <div className="container-clock">
      <div className="start" onClick={(e) => handleClick(true)}>
        <span className='text'>Start</span>
        <div className="time">
          <div className="hours" >
            <span className='text' onClick={(e) => handleClick(e)}>07:</span>
          </div>
          <div className="minutes" > <span className='text' onClick={(e) => handleClick(e)}>04</span> </div>
          <div className="AM-PM">
            <div className="am" ><span className='text' onClick={(e) => handleClick(e)}>AM</span> </div>
            <div className="pm" > <span className='text' onClick={(e) => handleClick(e)}>PM</span> </div>
          </div>
        </div>
      </div>
      <div className="end" onClick={() => handleClick(false)}>
        <span className='text'>End</span>
        <div className="time">
          <div className="hours">
            <span className='text'>07:</span>
          </div>
          <div className="minutes"> <span className='text'>04</span> </div>
          <div className="AM-PM">
            <div className="am"><span className='text'>AM</span> </div>
            <div className="pm"> <span className='text'>PM</span> </div>
          </div>
        </div>
      </div>
    </div >
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <TimeClock value={value} onChange={(newValue) => handleChange(newValue)} views={views} />
    </LocalizationProvider>
  </div >
};

export default Clock;




















