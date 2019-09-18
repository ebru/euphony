import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MostPlayed from '../../components/MostPlayed/MostPlayed';

import { fetchUserStartAsync } from '../../redux/user/user.actions';
import { selectCurrentUser, selectIsUserFetching } from '../../redux/user/user.selectors';

import './Dashboard.scss';

const Dashboard = props => {
  const { fetchUserStartAsync, currentUser: { mostPlayed } } = props;

  useEffect(() => {
    fetchUserStartAsync();
  }, []);

  return (
    <div className='Dashboard'>
      <div className='Main-container'>
        <div className='Dashboard-container'>
          <MostPlayed mostPlayed={mostPlayed} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isUserFetching: selectIsUserFetching,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUserStartAsync: () => dispatch(fetchUserStartAsync())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
