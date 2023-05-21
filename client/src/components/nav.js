

const Nav = () => {
  return <nav>
    <div className="nav">
      <div className="container">
        <div className="header-nav">
          <div className="logo">
            <div className="icon">
              <img src="./favicon.ico" alt="logo" />
            </div>
            <div className="test">Daily Manager | DM</div>
          </div>
          <div className="user-account">
            <div className="icon">
              <img src="./imgs/Profile.png" alt="user-img" />
            </div>
            <div className="text">
              <div className="name"> Hassan Hossam</div>
              <div className="tile"> Web developer</div>
            </div>
          </div>
        </div>
        <div className="app-options">
          <ul>
            <li key='Schedule' className="schedule">
              <div className="icon">
                <i class="fa-solid fa-clock"></i>
              </div>
              <div className="text">My Schedule</div>
            </li>
            <li key='Tasks' className="tasks">
              <div className="icon">
                <i class="fa-solid fa-list-check"></i>
              </div>
              <div className="text">Tasks</div>
            </li>
            <li key='Chat' className="chat">
              <div className="icon">
                <i class="fa-solid fa-comment-dots"></i>
              </div>
              <div className="text">Chat</div>
            </li>
            <li key='Dashboard' className="dashboard">
              <div className="icon">
                <i className="fa-sharp fa-solid fa-bolt"></i>
              </div>
              <div className="text">Dashboard</div>
            </li>
          </ul>
        </div>
        <div className="footer">
          <div className="log-out">
            <div className="icon">
              <i class="fa-solid fa-right-from-bracket"></i>
            </div>
            <div className="text">Logout</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
}
export default Nav;
