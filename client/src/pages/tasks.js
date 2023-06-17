
import Nav from "../components/main/nav";
import { Title } from "../utils/helpers";

const Tasks = () => {
  return <main>
    <Title title='DM - Tasks' />
    <div className="main-container">
      <Nav page='tasks' />
      <div className="main">
        <div className="container">
        tasks
        </div>
      </div>
    </div>
  </main>
};

export default Tasks;
