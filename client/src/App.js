

import './styles/pages/main.css'
import Home from "./pages/home";
import Calender from './pages/calender';
import Tasks from './pages/tasks';
import Chat from './pages/chat';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import Nav from './components/main/nav'
import { addMinutes } from 'date-fns';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useContext, createContext } from 'react';
import { GetDate } from './utils/helpers';
import { v4 as uuidv4 } from 'uuid';




const calenderContext = createContext()
export const useCalender = () => useContext(calenderContext)




function App() {

  // const [calender, setCalender] = useState({
  //   dateRange: { start: new Date(), end: add(new Date(), { days: 10 }) }
  //   , events: generateSudoEvents()
  // });
  const [calender, setCalender] = useState({ dateRange: { start: new Date(), end: new Date() }, events: generateSudoEvents() });

  return <Router>
    <div className="App">
      {<Nav />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/calender" element={
          <calenderContext.Provider value={{ calender, setCalender }} >
            <Calender />
          </calenderContext.Provider>
        } />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </div >
  </Router>
}

export default App;

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
  const colors = ['#E27AFB', '#17D2A0', '#0077FC', '#34A9DC', '#6658d3', '#5100B6', '#DDB372', '#E06C2A'];
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
    const dayEvents = 5
    const evs = []
    for (let j = 0; j <= dayEvents; j++) {
      // const index = +((Math.random() * 2).toFixed())
      // const hour = +((Math.random() * 5).toFixed())
      const index = 0
      const hour = 1
      const start = addMinutes(new Date(), -1250)
      evs.push({
        id: uuidv4(),
        title: titles[index],
        description: descriptions[index],
        color: colors[+((Math.random() * 7).toFixed())],
        urls: [1, 2, 3, 4, 5, 5, 5, 5, 5, 5].map(() => {
          return {
            name: 'hassan',
            link: 'google.com',
          }
        }),
        notes: notes[index],
        time: {
          // start: addHours(new Date(), -index), end: addHours(new Date(), index + hour)
          start: start, end: addMinutes(start, 230)
        },
      })
    }
    events.push({ day: days[i], evs: evs })
  }
  return events;

}