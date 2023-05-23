
import { Link } from 'react-router-dom';

const Nav = () => {
  return <nav>
    <div className="nav">
      <div className="container">
        <div className="header-nav">
          <div className="logo nav-text-icon">
            <div className="icon">
              <img src="./favicon.ico" alt="logo" />
            </div>
            <div className="text">Daily Manager</div>
          </div>
          <div className="user-account">
            <Link to='/' className='nav-text-icon'>
              <div className="icon">
                <img src="./imgs/Profile.png" alt="user-img" />
              </div>
              <div className="text">
                <div className="name"> Jone copper</div>
                <div className="title">UI Designer</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="app-options">
          <ul >
            <li key='Schedule' className="schedule" onClick={(e) => console.log(e.target)}>
              <Link to='/calender' className='nav-text-icon'>
                <div className="icon">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div className="text">My Schedule</div>
              </Link>
            </li>
            <li key='Tasks' className="tasks">
              <Link to='/tasks' className='nav-text-icon'>
                <div className="icon">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <div className="text">Tasks</div>
              </Link>
            </li>
            <li key='Chat' className="chat ">
              <Link to='/chat' className='nav-text-icon'>
                <div className="icon">
                  <i className="fa-solid fa-comment-dots"></i>
                </div>
                <div className="text">Chat</div>
              </Link>
            </li>
            <li key='Dashboard' className="dashboard">
              <Link to='/dashboard' className='nav-text-icon'>
                <div className="icon">
                  <i className="fa-sharp fa-solid fa-bolt"></i>
                </div>
                <div className="text">Dashboard</div>
              </Link>
            </li>
            <li key='Logout'>
              <div className="logout nav-text-icon">
                <div className="icon">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <div className="text">Logout</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
}
export default Nav;


function navClicker(ele) {
  console.log('🚀 ~ ele:', ele)

}
