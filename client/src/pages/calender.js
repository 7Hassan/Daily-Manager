
import { useState, useMemo, useEffect, useContext, createContext, useRef } from 'react'
import '../styles/pages/calender.css';
import { Title } from "../utils/helpers";
import Schedule from '../components/calender_page/schedule';
import { EventSwipes } from '../components/calender_page/swipes';
import { format, addHours, isToday, addMinutes, add } from 'date-fns';
import { useGet, usePost } from '../services/api/fetch';
import { GetDate } from '../utils/helpers';
import { Form } from '../components/calender_page/form';
import { useCalender } from '../App';






const Calender = ({ setLoading }) => {
  const { calender } = useCalender()
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
            <Schedule />
          </div>
        </div>
      }
    </div>
  </main >
}

export default Calender;





