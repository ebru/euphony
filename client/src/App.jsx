import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Homepage from './containers/Homepage/Homepage';
import Dashboard from './containers/Dashboard/Dashboard';
import Cookies from 'js-cookie';

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

const App = (props, { history }) => {
  return (
    <Router history={history}>
      <LandingRoute exact path='/' isAuthed={props.isAuthed} />
      <Route path='/logout' component={LogoutHandler} />
      <PrivateRoute isAuthed={props.isAuthed} path='/dashboard' component={Dashboard} />
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    isAuthed: state.isAuthed
  };
}

export default connect(mapStateToProps)(App);