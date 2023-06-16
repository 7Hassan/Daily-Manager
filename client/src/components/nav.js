
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Nav = ({ page }) => {
  const [scrolled, setScrolled] = useState('');
  useEffect(() => {
    let prevScroll = window.pageYOffset || document.documentElement.scrollTop;
    const handleScroll = () => {
      let currScroll = window.pageYOffset || document.documentElement.scrollTop;
      (currScroll > prevScroll) ? setScrolled('scroll') : setScrolled('')
      prevScroll = currScroll;
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);






  return <nav className={scrolled}>
    <div className="nav">
      <div className="container">
        <ul>
          <li className="img-text logo">
            <div className="logo-design img">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
          <li className="img-text user">
            <Link to='/'>
              <div className="img">
                <img src="./imgs/Profile.png" alt="user-img" className={page === 'home' ? "clicked" : ''} />
              </div>
            </Link>
            <div className="text">
              Profile
            </div>
          </li>
          <li key='Schedule' className={page === 'schedule' ? "schedule img-text clicked" : "img-text schedule"}>
            < Link to='/calender' >
              <div className="img">
                <i className="fa-solid fa-clock"></i>
              </div>
            </Link>
            <div className="text">My Schedule</div>
          </li>
          <li key='Tasks' className={page === 'tasks' ? "tasks clicked img-text" : "tasks img-text"}>
            <Link to='/tasks' >
              <div className="img">
                <i className="fa-solid fa-list-check"></i>
              </div>
            </Link>
            <div className="text">Tasks</div>
          </li>
          <li key='Chat' className={page === 'chat' ? "chat img-text clicked" : "img-text chat"}>
            <Link to='/chat' >
              <div className="img">
                <i className="fa-solid fa-comment-dots"></i>
              </div>
            </Link>
            <div className="text">Chat</div>
          </li>
          <li key='Dashboard' className={page === 'dashboard' ? "dashboard img-text clicked" : "img-text dashboard"}>
            <Link to='/dashboard' >
              <div className="img">
                <i className="fa-sharp fa-solid fa-bolt"></i>
              </div>
            </Link>
            <div className="text">Dashboard</div>
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




