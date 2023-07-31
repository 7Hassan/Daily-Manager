
import '../styles/pages/auth.css'
import { Title } from "../utils/helpers";
import { useState, useMemo } from "react";
import { Logo } from "../utils/elements";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ userName: '', password: '' })
  const [passShow, setPassShow] = useState(false)
  const { userName, password } = form
  const isDisabledForm = useMemo(() => !userName || !password, [userName, password])
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!isDisabledForm) {
      console.log(form)
    }
  }


  return <main>
    <Title title='DM - Login' />
    <div className="main-container">
      <div className="main">
        <div className='event-form login-form'>
          <div className="card">
            <div className="logo"><Logo spin={false} />
              <div className='text'> Daily <span className='ls'>Manager</span>   </div>

            </div>
            <div className="top-text">
              Login
            </div>
            <form action="POST" onSubmit={(e) => handleSubmit(e)} className="card-form">
              <div className="input">
                <input type="text" placeholder='required' className="input-field" name="userName"
                  value={userName} onChange={e => handleChange(e)} />
                <label className="input-label">User Name</label>
              </div>
              <div className="input password">
                <input type={passShow ? 'text' : 'password'} className="input-field" placeholder='required'
                  name="password" value={password} onChange={e => handleChange(e)} />
                <label className="input-label">Password</label>
                <div className='icons' onClick={() => setPassShow(!passShow)}>
                  <i className={`fa-solid fa-eye ${passShow ? '' : 'hidden'}`}></i>
                  <i className={`fa-solid fa-eye-slash ${passShow ? 'hidden' : ''}`}></i>
                </div>
              </div>
              <div className="action">
                <button type='submit' disabled={isDisabledForm}
                  className={`action-button ${isDisabledForm ? 'disabled' : ''}`}>Login</button>
              </div>
            </form>
            <div className="or">
              <span>or</span>
            </div>
            <div className="signUp">
              <Link to='/auth/signup'> Sign up </Link>
              <button className='btn'> Try test Account</button>
            </div>
          </div >

        </div >
      </div>
    </div>
  </main >
}

export default Login;

