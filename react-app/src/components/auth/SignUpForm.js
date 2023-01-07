import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({showModal, setShowModal}) => {
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

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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

  return (
    <div id="signup-modal-window" onClick={preventClosing} className={`dark-background hideModal ${showModal ? 'showModal' : ''}`}>
      <div id="sign-in-modal" className="main-modal">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='flex'>
          <p>Sign Up</p>
          <div className='flex-end cursor-pointer' onClick={e => setShowModal(false)}>X</div>
        </div>
        <div className='flex'>
          <label className={`flex-left ${hasSubmitted && firstNameError ? 'red-font' : ''}`}>{`First Name ${hasSubmitted && firstNameError ? firstNameError : ''}` }</label>
          <input
            type='text'
            name='firstName'
            onChange={updatefirstName}
            value={firstName}
            className={`flex-right white-background ${hasSubmitted && firstNameError ? 'red-border' : ''}`}
          ></input>
        </div>
        {/* {hasSubmitted && firstNameError &&
        <p className='red-font right'>
          {firstNameError}
        </p>
        } */}
        <div className='flex'>
          <label className={`flex-left ${hasSubmitted && lastNameError ? 'red-font' : ''}`}>{`Last Name ${hasSubmitted && lastNameError ? lastNameError : ''}`}</label>
          <input
            type='text'
            name='lastName'
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            className={`flex-right white-background ${hasSubmitted && lastNameError ? 'red-border' : ''}`}
          ></input>
        </div>
        {/* {hasSubmitted && lastNameError &&
        <p className='red-font right'>
          {lastNameError}
        </p>
        } */}
        <div className='flex'>
          <label className={`flex-left ${hasSubmitted && emailError ? 'red-font' : ''}`}>{`Email ${hasSubmitted && emailError ? emailError : ''}`}</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            className={`flex-right white-background ${hasSubmitted && emailError ? 'red-border' : ''}`}
          ></input>
        </div>
        {/* {hasSubmitted && emailError &&
        <p className='red-font right'>
          {emailError}
        </p>
        } */}
        <div className='flex'>
          <label className={`flex-left ${hasSubmitted && passwordError ? 'red-font' : ''}`}>{`Password ${hasSubmitted && passwordError ? passwordError : ''}`}</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            className={`flex-right white-background ${hasSubmitted && passwordError ? 'red-border' : ''}`}
          ></input>
        </div>
        {/* {hasSubmitted && passwordError &&
        <p className='red-font right'>
          {passwordError}
        </p>
        } */}
        <div className='flex'>
          <label className={`flex-left ${hasSubmitted && repeatPasswordError ? 'red-font' : ''}`}>{`Repeat Password ${hasSubmitted && repeatPasswordError ? repeatPasswordError : ''}`}</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className={`flex-right white-background ${hasSubmitted && repeatPasswordError ? 'red-border' : ''}`}
          ></input>
        </div>
        {/* {hasSubmitted && repeatPasswordError &&
        <p className='red-font right'>
          {repeatPasswordError}
        </p>
        } */}
        <div className='flex'>
          <button onClick={onSignUp} id="sign-in-submit-button" className='standard-button green-background center'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
