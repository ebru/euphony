import React from 'react';

import { default as MostPlayed } from './../../components/most-played/most-played.container';

import './dashboard.styles.scss';

const Dashboard = () => {
  return (
    <div className='Main-container'>
      <div className='Dashboard-container'>
        <MostPlayed />
      </div>
    </div>
  );
};

export default Dashboard;
