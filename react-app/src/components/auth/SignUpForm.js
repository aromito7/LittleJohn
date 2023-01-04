import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({showModal}) => {
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
    setHasSubmitted(true)
    if(firstNameError || emailError || passwordError || repeatPasswordError) return

    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

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
    <form id="sign-in-modal" onSubmit={onSignUp} className="modal dark-background" onClick={e => e.stopPropagation()} noValidate>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='flex'>
        <label className={`${hasSubmitted && firstNameError ? 'red-font' : ''}`}>{`First Name ${hasSubmitted && firstNameError ? firstNameError : ''}` }</label>
        <input
          type='text'
          name='firstName'
          onChange={updatefirstName}
          value={firstName}
          className={`flex-right ${hasSubmitted && firstNameError ? 'red-border' : ''}`}
        ></input>
      </div>
      {/* {hasSubmitted && firstNameError &&
      <p className='red-font right'>
        {firstNameError}
      </p>
      } */}
      <div className='flex'>
        <label className={`${hasSubmitted && lastNameError ? 'red-font' : ''}`}>{`Last Name ${hasSubmitted && lastNameError ? lastNameError : ''}`}</label>
        <input
          type='text'
          name='lastName'
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          className={`flex-right ${hasSubmitted && lastNameError ? 'red-border' : ''}`}
        ></input>
      </div>
      {/* {hasSubmitted && lastNameError &&
      <p className='red-font right'>
        {lastNameError}
      </p>
      } */}
      <div className='flex'>
        <label className={`${hasSubmitted && emailError ? 'red-font' : ''}`}>{`Email ${hasSubmitted && emailError ? emailError : ''}`}</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          className={`flex-right ${hasSubmitted && emailError ? 'red-border' : ''}`}
        ></input>
      </div>
      {/* {hasSubmitted && emailError &&
      <p className='red-font right'>
        {emailError}
      </p>
      } */}
      <div className='flex'>
        <label className={`${hasSubmitted && passwordError ? 'red-font' : ''}`}>{`Password ${hasSubmitted && passwordError ? passwordError : ''}`}</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className={`flex-right ${hasSubmitted && passwordError ? 'red-border' : ''}`}
        ></input>
      </div>
      {/* {hasSubmitted && passwordError &&
      <p className='red-font right'>
        {passwordError}
      </p>
      } */}
      <div className='flex'>
        <label className={`${hasSubmitted && repeatPasswordError ? 'red-font' : ''}`}>{`Repeat Password ${hasSubmitted && repeatPasswordError ? repeatPasswordError : ''}`}</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className={`flex-right ${hasSubmitted && repeatPasswordError ? 'red-border' : ''}`}
        ></input>
      </div>
      {/* {hasSubmitted && repeatPasswordError &&
      <p className='red-font right'>
        {repeatPasswordError}
      </p>
      } */}
      <div className='flex'>
        <button type='submit' id="sign-in-submit-button" className='standard-button green-background center'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
