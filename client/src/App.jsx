import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Homepage from './pages/Homepage/Homepage';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.scss';

const PrivateRoute = ({ component: Component, isAuthed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => isAuthed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}

const LandingRoute = ({ isAuthed }) => {
  return (
    <Route
      render={props => isAuthed === false
        ? <Homepage {...props} />
        : <Redirect to={{ pathname: '/dashboard' }} />}
    />
  )
}

const LogoutHandler = () => {
  useEffect(() => {
    Cookies.remove('userToken');
  });

  return window.location = '/';
};

const App = () => {
  const isAuthed = Cookies.get('userToken') ? true : false

  return (
    <div>
      <Header />
      <Switch>
        <LandingRoute exact path='/' isAuthed={isAuthed} />
        <Route path='/logout' component={LogoutHandler} />
        <PrivateRoute isAuthed={isAuthed} path='/dashboard' component={Dashboard} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;