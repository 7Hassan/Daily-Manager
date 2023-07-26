
import { Link } from 'react-router-dom';
import { Logo } from '../../utils/elements';

const Nav = ({ location, loading }) => {
  const { pathname } = location()
  return <nav>
    <div className="container">
      <ul>
        <li className={pathname === '/' ? "clicked logo" : "logo"}>
          <Link to='/'> <Logo spin={loading} /> </Link>
        </li>

        <li key='Schedule' className={pathname === '/calender' ? " clicked" : ""}>
          < Link to='/calender' >
            <div className="img">
              <i className="fa-solid fa-calendar"></i>
            </div>
            <div className="text">My Calender</div>
          </Link>
        </li>
        <li key='Tasks' className={pathname === '/tasks' ? "clicked" : ""}>
          <Link to='/tasks' >
            <div className="img">
              <i className="fa-solid fa-list-check"></i>
            </div>
            <div className="text">Tasks</div>
          </Link>
        </li>
        <li key='Chat' className={pathname === '/chat' ? "clicked" : ""}>
          <Link to='/chat' >
            <div className="img">
              <i className="fa-solid fa-comment-dots"></i>
            </div>
            <div className="text">Chat</div>
          </Link>
        </li>
        <li key='Dashboard' className={pathname === '/dashboard' ? "clicked" : ""}>
          <Link to='/dashboard' >
            <div className="img">
              <i className="fa-sharp fa-solid fa-bolt"></i>
            </div>
            <div className="text">Dashboard</div>
          </Link>
        </li>
      </ul>
    </div>
  </nav >
}
export default Nav;




