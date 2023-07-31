

import React from "react";
import { Link } from "react-router-dom";
const Auth = () => {
  return <div className="auth">
    <div className="auth-container">
      <ul>
        <li >
          <Link to='/auth/login' className="login"> Login</Link>
        </li>
        <li>
          <Link to='/auth/signup'> Sign up </Link>
        </li>
        <li>
          <button className="btn">or Try test Account</button>
        </li>
      </ul>
    </div>
  </div>
}

export default Auth;
