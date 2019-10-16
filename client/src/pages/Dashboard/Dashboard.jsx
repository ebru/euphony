import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchUserStartAsync } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { default as MostPlayed } from '../../components/MostPlayed/MostPlayed.container';
import PeopleCard from '../../components/PeopleCard/PeopleCard';
import MapCard from '../../components/MapCard/MapCard';

import './Dashboard.scss';

const Dashboard = props => {
  const { fetchUserStartAsync } = props;

  useEffect(() => {
    fetchUserStartAsync();
  }, [fetchUserStartAsync]);

  const people = [
    {
      "id": "1",
      "name": "loremipsum",
      "profileUrl": "spotify:user:loremipsum"
    },
    {
      "id": "2",
      "name": "Ebru Kaya",
      "profileUrl": "spotify:user:st943c9lgd92wk98aw3bfxcvb"
    }
  ];

  return (
    <div className='Main-container'>
      <div className='Dashboard-container'>
        <MostPlayed />
        <div className='statistics-container'>
          <PeopleCard people={people} />
          <MapCard />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
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
