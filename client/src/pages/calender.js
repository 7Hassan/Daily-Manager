
import { Title } from "../utils/funcs";
import Nav from "../components/nav";
import '../styles/pages/calender.css';
import Clock from "../components/clock";
import DateClock from "../components/date.clock";
// import DateCalender from "../components/date.calender";
const Calender = () => {
  return <main>
    <div className="main-container">
      <Title title='DM - Schedule' />
      <Nav page='schedule' />
      <div className="main">
        <div className="container">
          <div className="schedule">
            <div className="header">
              <div className="text-header">My Schedule</div>
              <div className="features-header-container">
                <div className="date-buttons">
                  <div className="date">02 - 08 March</div>
                  <div className="buttons">
                    <div className="left"><i class="fa-solid fa-chevron-left"></i></div>
                    <div className="right"><i class="fa-solid fa-chevron-right"></i></div>
                  </div>
                </div>
                <div className="new-event">
                  <div className="button"><i class="fa-solid fa-plus"></i> New Event</div>
                </div>
              </div>
            </div>
            <div className="table-dates">

            </div>
          </div>
          <div className="calender hidden">
          </div>
        </div>
      </div>
    </div>
  </main>
};

export default Calender;
