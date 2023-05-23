

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/main.css'
import Home from "./pages/home";
import Calender from './pages/calender';
import Tasks from './pages/tasks';
import Chat from './pages/chat';
import Dashboard from './pages/dashboard';

function App() {
  return <Router>
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div >
  </Router>
}

export default App;
