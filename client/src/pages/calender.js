
import { useState, useMemo, useEffect, useContext, createContext, useRef } from 'react'
import '../styles/pages/calender.css';
import { Title } from "../utils/helpers";
import Schedule from '../components/calender_page/schedule';
import { EventSwipes } from '../components/calender_page/swipes';
import { CalenderDays } from '../components/calender_page/datesComponents';
import { Clock } from '../components/calender_page/datesComponents';
import { format, addHours, isToday, addMinutes } from 'date-fns';
import { useGet, usePost } from '../services/api/fetch';
import { GetDate } from '../utils/helpers';


const calenderContext = createContext()
export const useCalender = () => useContext(calenderContext)

const TimeInputs = ({ tempDateRange, setTempDateRange, evTime, setEvTime }) => {
  const [calender, setCalender] = useState(true)

  return <div className="input date-clock">
    <div className="date-container">
      <div className={`header ${calender ? 'calender-show' : 'clock-show'}`}>
        <button className='calender-btn' onClick={() => setCalender(true)}>
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DateRangeIcon">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></svg>
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
              <CalenderDays data={{ tempDateRange, setTempDateRange, hideCalender: calender }} />
            </div>
          </div>
        </div>
          : <Clock evTime={evTime} setEvTime={setEvTime} />
        }
      </div>
    </div>
  </div >
}
const Form = ({ showForm, setShowForm }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    color: '',
    urlName: '',
    urlLink: '',
    urls: [],
    notes: '',
    days: { start: new Date(), end: new Date() },
    time: { start: new Date(), end: new Date() },
  })

  const { title, description, color, urlLink, urlName, notes } = form
  const isDisabledForm = useMemo(() => !title || !color, [title, color])
  const isDisabledUrl = useMemo(() => !urlLink || !urlName, [urlName, urlLink])
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const urlRemove = (index) => {
    const urls = [...form.urls]
    urls.splice(index, 1)
    setForm({ ...form, urls: [...urls] })
  }

  const handleKeyDown = (e) => {
    const value = e.target.value
    if (e.nativeEvent.inputType !== 'deleteContentBackward') {
      const notesDote = value.split('\n').map((note) => note.includes('•') ? note : '• ' + note).join('\n')
      setForm({ ...form, notes: notesDote })
    }
    else setForm({ ...form, notes: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isDisabledForm) {
      console.log(form)
    }
  }

  return <div className={`event-form ${showForm ? 'show' : ''}`}>
    <div className="card">
      <div className="cancel-form">
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
      <form action="POST" onSubmit={(e) => handleSubmit(e)} className="card-form">
        <div className="input">
          <input type="text" placeholder='required' className="input-field" name="title" value={title} onChange={e => handleChange(e)} />
          <label className="input-label">Title</label>
        </div>
        <div className="input">
          <input type="text" className="input-field" placeholder='optional' name="description" value={description} onChange={e => handleChange(e)} />
          <label className="input-label">Description</label>
        </div>
        <div className="colors">
          <label >Color</label>
          <div className="colors">
            {
              ['#E27AFB', '#17D2A0', '#34A9DC', '#0077FC', '#6658d3', '#5100B6', '#DDB372', '#E06C2A']
                .map((col) => <span style={{ backgroundColor: col }} key={col} className={col === color ? 'selected' : ''}
                  onClick={() => setForm({ ...form, color: col })}></span>)
            }

          </div>
        </div>
        <div className="input url">
          <div className={`button ${isDisabledUrl ? 'disabled' : ''}`}
            onClick={() => isDisabledUrl ? null
              : setForm({ ...form, urlLink: '', urlName: '', urls: [...form.urls, { name: urlName, link: urlLink }] })
            }>Add</div>
          <input type="text" className="input-field" placeholder='link' value={urlLink} name="urlLink" onChange={e => handleChange(e)} />
          <input type="text" className="input-field first-in" placeholder='name' value={urlName} name="urlName" onChange={e => handleChange(e)} />
          <label className="input-label">Url</label>
        </div>
        <div className="urls">
          {
            form.urls.map((url, i) => {
              return (
                <div key={`${i}${url.name}`}>
                  <a target={'_blank'} rel="noopener noreferrer" href={url.link}>{url.name}</a>
                  <i className="fa-solid fa-circle-xmark" onClick={() => urlRemove(i)}></i>
                </div>
              )
            })
          }
        </div>
        <div className="input text-area">
          <textarea placeholder='optional' name="notes"
            value={notes} onChange={e => handleKeyDown(e)}
          />
          <label className="input-label">Notes</label>
        </div>
        <TimeInputs
          tempDateRange={form.days}
          setTempDateRange={(obj) => setForm({ ...form, days: obj })}
          evTime={form.time}
          setEvTime={(obj) => setForm({ ...form, time: obj })}
        />
        <div className="action">
          <button type='submit' disabled={isDisabledForm}
            className={`action-button ${isDisabledForm ? 'disabled' : ''}`}>Add</button>
        </div>
      </form>
    </div >
  </div >
}

const Calender = ({ setLoading }) => {
  const [calender, setCalender] = useState({ dateRange: { start: new Date(), end: new Date() }, events: generateSudoEvents() });
  // const [calender, setCalender] = useState({ dateRange: { start: new Date(), end: new Date() }, events: [] });
  const todayCalender = calender.events.filter(event => isToday(event.day))[0]
  const [form, setForm] = useState(false)

  return <main >
    <Title title='DM - Schedule' />
    <div className="main-container">
      {form && < Form showForm={form} setShowForm={setForm} />}
      {
        !form && <div className="main">
          <div className="container" >
            <div className="head-schedule">
              <div className="text">
                <i className="fa-solid fa-calendar-check"></i>
                <span>Calender</span>
              </div>
              <button className='btn' onClick={() => setForm(true)}>New Event</button>
            </div>
            {todayCalender?.evs && <div className="top-events" >
              <EventSwipes events={todayCalender.evs} />
            </div>}
            <calenderContext.Provider value={{ calender, setCalender }} >
              <Schedule />
            </calenderContext.Provider>
          </div>
        </div>
      }
    </div>
  </main >
}

export default Calender;



function generateSudoEvents() {

  const events = []
  const getDate = new GetDate(new Date(), new Date());
  const titles = [
    "Birthday Party",
    "Music Concert",
    "Conference",
    "Workshop",
    "Sports Tournament",
    "Wedding Ceremony",
    "Art Exhibition",
    "Charity Event",
  ];
  const notes = [
    "Bring a gift and join us for a fun-filled celebration!",
    "Get ready for an amazing musical experience with top artists!",
    "An industry-leading conference with expert speakers and workshops.",
    "Learn new skills and techniques in this interactive workshop.",
    "Join the sports tournament and showcase your athletic prowess!",
    "A special day to celebrate the union of two souls.",
    "Explore breathtaking art pieces from talented artists.",
    "Support a cause and make a positive impact on society.",
  ];
  const colors = ['#E27AFB', '#17D2A0', '#34A9DC', '#0077FC', '#6658d3', '#5100B6', '#DDB372', '#E06C2A'];
  const descriptions = [
    "Join our Birthday Party event!",
    "Join our Music Concert event!",
    "Join our Conference event!",
    "Join our Workshop event!",
    "Join our Sports Tournament event!",
    "Join our Wedding Ceremony event!",
    "Join our Art Exhibition event!",
    "Join our Charity Event event!",
  ]
  const days = getDate.monDays()

  for (let i = 0; i < days.length; i++) {
    // const dayEvents = Math.random() * 5
    const dayEvents = 5
    const evs = []
    for (let j = 0; j <= dayEvents; j++) {
      // const index = +((Math.random() * 1).toFixed())
      // const hour = +((Math.random() * 1).toFixed())
      const index = 0
      const hour = 1
      const start = addMinutes(new Date(), -1250)
      evs.push({
        title: titles[index],
        description: descriptions[index],
        color: colors[index],
        urls: [1, 2, 3, 4, 5, 5, 5, 5, 5, 5].map(() => {
          return {
            name: 'hassan',
            link: 'google.com',
          }
        }),
        notes: notes[index],
        time: {
          // start: addHours(new Date(), index), end: addHours(new Date(), index + hour)
          start: start, end: addMinutes(start, 120)
        },
      })
    }
    events.push({ day: days[i], evs: evs })
  }
  return events;

}

