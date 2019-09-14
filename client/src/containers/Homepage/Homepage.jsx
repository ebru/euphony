import React, { useState, useEffect } from 'react';
import './Homepage.scss';
import Header from '../../components/Header/Header';
import CustomButton from '../../components/CustomButton/CustomButton';

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
      <Header />
      <div className='Main-container'>
        <div className='Homepage-container'>
          <div className='call-to-action'>
            Find out your <em>all-time favorite</em> song
          </div>
          <div>
            <CustomButton
              className='spofity-login-btn'
              onClick={connectWithSpotifyHandler}
            >
              Connect with Spotify
            </CustomButton>
          </div>
          <div className='Days-passed-container'>
            this project started {state.daysPassed} days ago for learning purposes, more to go 🥂
          <br />
            <a href='https://github.com/ebru/euphony' target='_blank' rel='noopener noreferrer'><b>repo</b></a>
          </div>
        </div>
      </div>
    </div >
  );
}
export default Homepage;
