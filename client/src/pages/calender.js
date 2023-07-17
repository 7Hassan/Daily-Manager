
import { useState, useMemo, useEffect } from 'react'
import '../styles/pages/calender.css';
import { Title } from "../utils/helpers";
import Nav from "../components/main/nav";
import Schedule from '../components/calender_page/schedule';
import { EventSwipes } from '../components/calender_page/swipes';
import { Calender as CalenderDates } from '../components/calender_page/header';
import Clock from '../components/others/clock';
import { format } from 'date-fns';
import dayjs from 'dayjs';


const TimeInputs = ({ tempDateRange, setTempDateRange, evTime, setEvTime }) => {
  const [calender, setCalender] = useState(true)

  return <div className="input date-clock">
    <div className="date-container">
      <div className={`header ${calender ? 'calender-show' : 'clock-show'}`}>
        <button className='calender-btn' onClick={() => setCalender(true)}>
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DateRangeIcon"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></svg>
        </button>
        <button className='clock-btn' onClick={() => setCalender(false)}>
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TimeIcon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
        </button>
        <span></span>
      </div>
      <div className="content-components">
        {calender ? <div className='calender'>
          <div className="calender-container">
            <div className="calender-component">
              <CalenderDates data={{ tempDateRange, setTempDateRange, hideCalender: calender }} />
            </div>
          </div>
        </div>
          : <Clock evTime={evTime} setEvTime={setEvTime} />
        }
      </div>
    </div>
  </div >
}

const Form = () => {
  const [tempDateRange, setTempDateRange] = useState({ start: new Date(), end: new Date() })
  const [evTime, setEvTime] = useState({ value: dayjs(new Date()), start: dayjs(new Date()), end: dayjs(new Date()) })


  const [form, setForm] = useState({
    title: '',
    description: '',
    days: tempDateRange,
    time: {
      start: evTime.start,
      end: evTime.end,
    },
    url: '',
    notes: '',
  })
  useEffect(() => {
    setForm({
      ...form,
      days: tempDateRange,
      time: {
        start: evTime.start,
        end: evTime.end,
      }
    })
  }, [evTime, tempDateRange]);

  const { title, description, url, notes } = form
  const isDisabled = useMemo(() => Object.values(form).some(input => !input), [form])
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form)
  }
  return <div className="event-form">
    <div className="card">
      <form action="POST" onSubmit={(e) => handleSubmit(e)} className="card-form">
        <div className="input">
          <input type="text" placeholder='required' className="input-field" name="title" value={title} onChange={e => handleChange(e)} />
          <label className="input-label">Title</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" placeholder='optional' name="description" value={description} onChange={e => handleChange(e)} />
          <label className="input-label">Description</label>
        </div>
        <TimeInputs
          tempDateRange={tempDateRange}
          setTempDateRange={setTempDateRange}
          evTime={evTime}
          setEvTime={setEvTime}
        />
        <div className="input text-area urls">
          <textarea placeholder='optional' name="url" value={url} onChange={e => handleChange(e)} />
          <label className="input-label">Urls</label>
        </div>
        <div className="input text-area">
          <textarea placeholder='optional' name="notes" value={notes} onChange={e => handleChange(e)} />
          <label className="input-label">Notes</label>
        </div>
        <div className="action">
          <button type='submit' disabled={isDisabled} className="action-button">Add</button>
        </div>
      </form>
    </div >
  </div >
}




const Calender = (props) => {
  const [form, setForm] = useState(false)
  const body = document.body.style
  form ? body.overflow = 'hidden' : body.overflow = 'unset';

  return <main>
    <div className="main-container">
      {form && <div className="over-layout" onClick={() => setForm(false)}></div>}
      <Title title='DM - Schedule' />
      <Nav page='schedule' />
      <div className="main">
        {form && < Form />}
        <div className="container">
          <div className="head-schedule">
            <div className="text">Schedule</div>
            <button className='btn' onClick={() => setForm(true)}>New Event</button>
          </div>
          <div className="top-events">
            <EventSwipes />
          </div>
          <Schedule data={props} />
        </div>
      </div>
    </div>
  </main >
}

export default Calender;







