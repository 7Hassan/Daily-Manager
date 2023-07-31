
import '../styles/pages/auth.css'
import { Title } from "../utils/helpers";
import { useState, useMemo } from "react";
import { Logo } from "../utils/elements";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', jobTitle: '', userName: '', password: '', rememberPassword: '' })
  const [passShow, setPassShow] = useState(false)
  const { firstName, lastName, jobTitle, userName, password, rememberPassword } = form
  const isDisabledForm = useMemo(() =>
    !firstName || !jobTitle || !userName || userName.length < 4 || !password
    || password.length < 8 || !rememberPassword,
    [firstName, jobTitle, userName, password, rememberPassword])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!isDisabledForm) {
      console.log(form)
    }
  }


  return <main>
    <Title title='DM - SignUp' />
    <div className="main-container">
      <div className="main">
        <div className='event-form login-form'>
          <div className="card">
            <div className="logo"><Logo spin={false} />
              <div className='text'> Daily <span className='ls'>Manager</span>   </div>

            </div>
            <div className="top-text">Sign up</div>
            <form action="POST" onSubmit={(e) => handleSubmit(e)} className="card-form">
              <div className='first-last-name'>
                <div className="input">
                  <input type="text" placeholder='required' className="input-field" name="firstName"
                    value={firstName} onChange={e => handleChange(e)} />
                  <label className="input-label">First Name</label>
                </div>
                <div className="input">
                  <input type="text" placeholder='optional' className="input-field" name="lastName"
                    value={lastName} onChange={e => handleChange(e)} />
                  <label className="input-label">Last Name</label>
                </div>
              </div>
              <div className="input">
                <input type="text" placeholder='required' className="input-field" name="jobTitle"
                  value={jobTitle} onChange={e => handleChange(e)} />
                <label className="input-label">Job Title</label>
              </div>
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
              <div className="input">
                <input type="text" placeholder='For Forgetting Password' className="input-field" name="rememberPassword"
                  value={rememberPassword} onChange={e => handleChange(e)} />
                <label className="input-label">What is your nike name?</label>
              </div>
              <div className="action">
                <button type='submit' disabled={isDisabledForm}
                  className={`action-button ${isDisabledForm ? 'disabled' : ''}`}>Sign up</button>
              </div>
            </form>
            <div className="or">
              <span>or</span>
            </div>
            <div className="signUp">
              <Link to='/auth/login'> Log in</Link>
              <button className='btn'> Try test Account</button>
            </div>
          </div >

        </div >
      </div>
    </div>
  </main >
}

export default Login;

