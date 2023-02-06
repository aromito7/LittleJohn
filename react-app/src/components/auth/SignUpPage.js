import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import loginImage from '../../images/login.jpg'
import SignUpForm from './SignUpForm';
import { signUp } from '../../store/session';
import './LoginForm.css'

const SignUpPage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [repeatPasswordError, setRepeatPasswordError] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHasSubmitted(true)
    if(firstNameError || emailError || passwordError || repeatPasswordError) return

    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const preventClosing = e => {
    e.stopPropagation()
  }

  const updatefirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    if(firstName.length == 0) setFirstNameError(" is required")
    else if(firstName.length < 2 || firstName.length > 50) setFirstNameError(" must be between 2 and 50 charactrs")
    else setFirstNameError('')

    if(lastName.length == 0) setLastNameError(" is required")
    else if(lastName.length < 2 || lastName.length > 50) setLastNameError(" must be between 2 and 50 charactrs")
    else setLastNameError('')

    if(email.length == 0) setEmailError(" is required")
    else if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) setEmailError(" not valid")
    else setEmailError('')

    if(password.length == 0) setPasswordError(" is required")
    else setPasswordError('')

    if(repeatPassword.length == 0) setRepeatPasswordError(" is required")
    else if(password != repeatPassword) setRepeatPasswordError(" must match Password")
    else setRepeatPasswordError('')


  },[firstName, lastName, email, password, repeatPassword])

  if (user) {
    return <Redirect to='/' />;
  }

  document.body.style.overflow = "hidden"

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="sign-up-container">
      <div className="left-half" id="signup-image-container">
        {/* <img className="half" id="login-image" src={loginImage}/> */}
        <div className='flex'>
            <p className='font28'>Littlejohn</p>
            <i class="fa-solid fa-feather fa-2xl"></i>
        </div>
        <div>
            <p id="signup-invest-blob" className='font-light-green font72'>Invest with zero commission fees</p>
        </div>
      </div>
      <div className="right-half">
        <div id="sign-in-form">
            <div>
            {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
            </div>
            <div className='flex'>
                <p className="font16">Enter your first and last name as they appear on your government ID.</p>
            </div>
            <div className='flex'>
                <input
                    type='text'
                    name='firstName'
                    onChange={updatefirstName}
                    value={firstName}
                    placeholder="First Name"
                    className={`flex-left pad10 white-background ${hasSubmitted && firstNameError ? 'red-border' : ''}`}
                />
                <input
                    type='text'
                    name='lastName'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Last Name"
                    className={`flex-right-half pad10 white-background ${hasSubmitted && lastNameError ? 'red-border' : ''}`}
                />
            </div>
            {hasSubmitted && (firstNameError || lastNameError) &&

                <div className='flex'>
                    <label className={`flex-left ${hasSubmitted && firstNameError ? 'red-font' : ''}`}>{`${hasSubmitted && firstNameError ? "First Name " + firstNameError : ''}` }</label>
                    <label className={`${hasSubmitted && lastNameError ? 'red-font' : ''}`}>{`${hasSubmitted && lastNameError ? "Last Name " + lastNameError : ''}`}</label>
                </div>
            }
            {/* {hasSubmitted && lastNameError &&
            <p className='red-font right'>
            {lastNameError}
            </p>
            } */}
            <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder="Email"
                className={`white-background pad10 full-width-20 margin-verticle5 ${hasSubmitted && emailError ? 'red-border' : ''}`}
            />
            {hasSubmitted && emailError &&
                <label className={`flex-left ${hasSubmitted && emailError ? 'red-font' : ''}`}>{`Email ${hasSubmitted && emailError ? emailError : ''}`}</label>
            }
            {/* {hasSubmitted && emailError &&
            <p className='red-font right'>
            {emailError}
            </p>
            } */}
            <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder="Password"
                className={`white-background full-width-20 pad10 margin-verticle5 ${hasSubmitted && passwordError ? 'red-border' : ''}`}
            />
            {hasSubmitted && passwordError &&
                <label className={`flex-left ${hasSubmitted && passwordError ? 'red-font' : ''}`}>{`Password ${hasSubmitted && passwordError ? passwordError : ''}`}</label>
            }
            {/* {hasSubmitted && passwordError &&
            <p className='red-font right'>
            {passwordError}
            </p>
            } */}
            <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="Repeat Password"
                className={`white-background full-width-20 pad10 margin-verticle5 ${hasSubmitted && repeatPasswordError ? 'red-border' : ''}`}
            />
            {hasSubmitted && repeatPasswordError &&
                <label className={`flex-left ${hasSubmitted && repeatPasswordError ? 'red-font' : ''}`}>{`Repeat Password ${hasSubmitted && repeatPasswordError ? repeatPasswordError : ''}`}</label>
            }
            {/* {hasSubmitted && repeatPasswordError &&
            <p className='red-font right'>
            {repeatPasswordError}
            </p>
            } */}
            <div className='flex-verticle'>
                <div className='flex'>
                    <button onClick={onSignUp} id="sign-in-submit-button" className='dark-button center'>Sign Up</button>
                </div>
                <div id="signin-divider" className='dividing-line'><span>or</span></div>
                <div id="already-user">
                    <p>Already a user?</p>
                    <p className="cursor-pointer underline"><a href="/login" className='black-font'>Log In</a></p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
