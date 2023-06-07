
import { Link } from 'react-router-dom';

const Nav = ({ page }) => {
  return <nav>
    <div className="nav">
      <div className="container">
        <ul>
          <li className="img-text logo">
            <div className="img">
              <img src="./favicon.ico" alt="logo" />
            </div>
            <div className="text">Daily Manager</div>
          </li>
          <li className="img-text user">
            <Link to='/'>
              <div className="img">
                <img src="./imgs/Profile.png" alt="user-img" className={page === 'home' ? "clicked" : NaN} />
              </div>
            </Link>
            <div className="text">
              Profile
              {/* <div className="name"> Jone copper</div>
              <div className="title">UI Designer</div> */}
            </div>
          </li>
          <li key='Schedule' className={page === 'schedule' ? "schedule img-text clicked" : "img-text schedule"}>
            < Link to='/calender' >
              <div className="img">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="text">My Schedule</div>
            </Link>
          </li>
          <li key='Tasks' className={page === 'tasks' ? "tasks clicked img-text" : "tasks img-text"}>
            <Link to='/tasks' >
              <div className="img">
                <i className="fa-solid fa-list-check"></i>
              </div>
              <div className="text">Tasks</div>
            </Link>
          </li>
          <li key='Chat' className={page === 'chat' ? "chat img-text clicked" : "img-text chat"}>
            <Link to='/chat' >
              <div className="img">
                <i className="fa-solid fa-comment-dots"></i>
              </div>
              <div className="text">Chat</div>
            </Link>
          </li>
          <li key='Dashboard' className={page === 'dashboard' ? "dashboard img-text clicked" : "img-text dashboard"}>
            <Link to='/dashboard' >
              <div className="img">
                <i className="fa-sharp fa-solid fa-bolt"></i>
              </div>
              <div className="text">Dashboard</div>
            </Link>
          </li>
          <li key='Logout' className='img-text logout'>
            <div className="img">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
            <div className="text">Logout</div>
          </li>
        </ul>
      </div>
    </div>
  </nav >
}
export default Nav;



