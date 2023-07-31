

import './styles/pages/main.css'
import Home from "./pages/home";
import Calender from './pages/calender';
import Tasks from './pages/tasks';
import Chat from './pages/chat';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Nav from './components/main/nav'


function App() {
  const [loading, setLoading] = useState(false)
  return <Router>
    <div className="App">
      {<Nav location={useLocation} loading={loading} />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/calender" element={<Calender setLoading={setLoading} />} />
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

