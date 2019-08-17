import React, { useState, useEffect } from 'react';
import Button from 'antd/es/button';
import './Homepage.css';

const Homepage = () => {
  const [state, setState] = useState({
    daysPassed: '',
  });

  const connectWithSpotifyHandler = () => {
    return window.location = '/api/login';
  }

  useEffect(() => {
    let current = new Date();
    let started = new Date(2019, 7, 10)

    setState({
      daysPassed: Math.ceil((current - started + 1) / 86400000),
    });
  }, []);

  return (
    <div className='Homepage'>
      <div className='Homepage-container'>
        <div>Hello!</div>
        <div>
          <Button onClick={connectWithSpotifyHandler} type='primary' size='large'>Connect with Spotify</Button>
        </div>
        <div className='Days-passed-container'>
          this project started {state.daysPassed} days ago for learning purposes, more to go 🥂
          <br />
          <a href='https://github.com/ebrukye/euphony' target='_blank' rel='noopener noreferrer'><b>repo</b></a>
        </div>
      </div>
    </div >
  );
}
export default Homepage;
