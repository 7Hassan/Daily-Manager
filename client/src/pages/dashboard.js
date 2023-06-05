
import Nav from "../components/nav";
import { Title } from "../utils/funcs";


const Dashboard = () => {
  return <main>
    <Title title='DM - Dashboard' />
    <div className="main-container">
      <Nav page='dashboard' />
      <div className="main">
        <div className="container">
          dashboard
        </div>
      </div>
    </div>
  </main>
};

export default Dashboard;
