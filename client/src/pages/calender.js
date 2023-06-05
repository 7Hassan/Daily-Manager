
import '../styles/pages/calender.css';
import { Title } from "../utils/funcs";
import Nav from "../components/nav";
import CalenderNav from '../components/calender_page/nav'
import Schedule from '../components/calender_page/schedule';


const Calender = () => {
  return <main>
    <div className="main-container">
      <Title title='DM - Schedule' />
      <Nav page='schedule' />
      <div className="main">
        <div className="container">
          <Schedule />
          <CalenderNav />
        </div>
      </div>
    </div>
  </main >
}

export default Calender;
