import React from 'react';
import './Homepage.scss';
import CustomButton from '../../components/CustomButton/CustomButton';

const Homepage = () => {
  const connectWithSpotifyHandler = () => {
    return window.location = '/api/login';
  }

  return (
    <div className='Homepage'>
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
          <div className='description'>
            <code>
              <strong style={{ fontSize: '14px' }}>euphony</strong> <em>noun [ U ] /ˈjuː.fə.ni/</em>
              <br />
              agreeableness of sound; pleasing effect to the ear,
              especially a pleasant sounding or harmonious combination or succession of words.
              </code>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Homepage;