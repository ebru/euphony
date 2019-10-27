import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Homepage from './pages/homepage/homepage.component';
import Dashboard from './pages/dashboard/dashboard.component';
import UserProfile from './pages/user-profile/user-profile.component';
import Settings from './pages/settings/settings.component';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

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
    Cookies.remove('accessToken');
  });

  return window.location = '/';
};

const App = ({ isAuthed }) => (
  <div>
    <Header isAuthed={isAuthed} />
    <Switch>
      <LandingRoute exact path='/' isAuthed={isAuthed} />
      <Route path='/logout' component={LogoutHandler} />
      <PrivateRoute isAuthed={isAuthed} path='/dashboard' component={Dashboard} />
      <PrivateRoute isAuthed={isAuthed} path='/profile' component={UserProfile} />
      <PrivateRoute isAuthed={isAuthed} path='/settings' component={Settings} />
    </Switch>
    <Footer />
  </div>
);

export default App;