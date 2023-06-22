
import '../styles/pages/calender.css';
import { Title } from "../utils/helpers";
import Nav from "../components/main/nav";
import CalenderNav from '../components/calender_page/nav'
import Schedule from '../components/calender_page/schedule';
import { useState } from 'react';

const Calender = () => {
  const [date, setDate] = useState(new Date());


  return <main>
    <div className="main-container">
      <Title title='DM - Schedule' />
      <Nav page='schedule' />
      <div className="main">
        <div className="container">
          <Schedule date={date} setDate={setDate} />
          {/* <CalenderNav date={date} setDate={setDate} /> */}
        </div>
      </div>
    </div>
  </main >
}

export default Calender;







