import React from 'react';

import { default as MostPlayed } from './../../components/MostPlayed/MostPlayed.container';
// import PeopleCard from './../../components/PeopleCard/PeopleCard';
// import MapCard from './../../components/MapCard/MapCard';

import './Dashboard.scss';

const Dashboard = () => {
  // const people = [
  //   {
  //     "id": "1",
  //     "name": "loremipsum",
  //     "profileUrl": "spotify:user:loremipsum"
  //   },
  //   {
  //     "id": "2",
  //     "name": "Ebru Kaya",
  //     "profileUrl": "spotify:user:st943c9lgd92wk98aw3bfxcvb"
  //   }
  // ];

  return (
    <div className='Main-container'>
      <div className='Dashboard-container'>
        <MostPlayed />
        {/* <div className='statistics-container'>
          <PeopleCard people={people} />
          <MapCard />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
