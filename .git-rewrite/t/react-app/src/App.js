import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
//import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Stock from './components/StockPage';
import Menu from './components/menu.js';
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  //<NavBar />
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/stocks/:symbol' exact={true}>
          <Menu/>
          <Stock/>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Menu/>
          <LandingPage/>
        </ProtectedRoute>
        <Route path='/about' exact={true}>
          <About/>
        </Route>
        <Route path='/' exact={true}>
          <LoginForm/>
        </Route>
        <Route path='/'>
          <ErrorPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
