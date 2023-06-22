

import { Title } from "../utils/helpers";
import Nav from "../components/main/nav";

const Home = () => {
  return <main>
    <Title title='Daily Manager (DM)' />
    <div className="main-container">
      <Nav page='/' />
      <div className="main">
        <div className="container">
          home
        </div>
      </div>
    </div>
  </main>
};

export default Home;
