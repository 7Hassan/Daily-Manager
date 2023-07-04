
import '../styles/pages/calender.css';
import { Title } from "../utils/helpers";
import Nav from "../components/main/nav";
import Schedule from '../components/calender_page/schedule';

const Calender = (props) => {
  return <main>
    <div className="main-container">
      <Title title='DM - Schedule' />
      <Nav page='schedule' />
      <div className="main">
        <div className="container">
          <Schedule data={props} />
        </div>
      </div>
    </div>
  </main >
}

export default Calender;







