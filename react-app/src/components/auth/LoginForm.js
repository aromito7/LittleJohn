import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  document.body.style.overflow = "hidden"

  const onLogin = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if(passwordError || emailError) return
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

  // const openSignupModal = e => {
  //   e.stopPropagation()
  //   setShowSignUpModal(true)
  //   setFirstShowing(false)
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    for(let error of errors){
      const [type, message] = error.split(' : ')
      if(type === "email"){
        setEmailError(message.split('Email')[1])
        return
      }
      else if(type === 'password'){
        setPasswordError(message.split('Password')[1])
        return
      }
    }
  },[errors])

  useEffect(() => {
    const errors = []
    if(email.length === 0) {
      setEmailError(" is required")
    }
    else if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
      setEmailError(" is not valid")
    }
    else setEmailError('')

    if(password.length === 0) {
      setPasswordError(" is required")
    }
    else setPasswordError('')

    setErrors(errors)
  },[email, password])

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="login-container">
      <div className="left-half" id="login-image-container">
        {/* <img className="half" id="login-image" src={loginImage}/> */}
      </div>
      <div className="right-half" id="login-form-container">
        <form className="half">
          <p className='font28'>Log in to Littlejohn</p>
          <div id="login-inputs">
            <label htmlFor='email' className={hasSubmitted && emailError ? "red-font" : ''}>Email {hasSubmitted && emailError ? emailError : ''}</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              className={hasSubmitted && emailError ? "red-border" : ''}
              />
            <label htmlFor={showPassword ? '' : 'password'} className={hasSubmitted && passwordError ? "red-font" : ''}>Password {hasSubmitted && passwordError ? passwordError : ''}</label>
            <input
              name='password'
              type={showPassword ? '' : 'password'}
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              className={hasSubmitted && passwordError ? "red-border" : ''}

              />
          </div>
          <div id="login-buttons-container">
            <button type='submit' className='dark-button' onClick={onLogin}>Log In</button>
            <button type='submit' className='dark-button' onClick={loginDemo}>Demo User</button>
          </div>
          <div id="login-divider" className='dividing-line'><span>or</span></div>
          <div id='demo-login-container' className='flex'>
            <p>Not on Littlejohn? <a className='cursor-pointer underline bold' onClick={e => history.push('/signup')}>Create an account</a></p>
          </div>
        </form>
        {/* {!firstShowing &&
          <SignUpForm showModal={showSignUpModal} setShowModal={setShowSignUpModal}/>
        } */}
      </div>
    </div>
  );
};

export default LoginForm;
