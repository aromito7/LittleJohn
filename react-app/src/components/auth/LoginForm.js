import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import loginImage from '../../images/login.jpg'
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if(data){
      setErrors(data)
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="login-container">
      <div className="left-half">
        <img className="half" id="login-image" src={loginImage}/>
      </div>
      <div className="right-half">
        <form className="half">
          <h2>Log in to Little John</h2>
          {errors.length > 0 && <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>}
          <div id="login-inputs">
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              />
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              />
          </div>
          <div id="login-buttons-container">
            <button type='submit' className='cursor-pointer' onClick={onLogin}>Login</button>
            <button type='submit' className='cursor-pointer' onClick={loginDemo}>Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
