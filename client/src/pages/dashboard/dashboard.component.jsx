import React from 'react';

import MostPlayed from './../../components/most-played/most-played.component';

import './dashboard.styles.scss';

const Dashboard = () => {
  return (
    <div className='main-container'>
      <div className='dashboard-container'>
        <MostPlayed />
      </div>
    </div>
  );
};

export default Dashboard;
