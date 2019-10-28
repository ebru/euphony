import React from 'react';

import { ReactComponent as SpotifySvg } from './../../images/spotify-logo.svg';
import CustomButton from '../../components/custom-button/custom-button.component';
import CustomIcon from '../../components/custom-icon/custom-icon.component';

import './homepage.styles.scss';

const connectWithSpotifyHandler = () => {
	return window.location = '/api/login';
};

const Homepage = () => {
	return (
		<div className='main-container'>
			<div className='homepage-container'>
				<div className='call-to-action'>
					Find out your <em>all-time favorite</em> song
          			</div>

				<CustomButton
					className='spofity-login-btn'
					onClick={connectWithSpotifyHandler}
				>
					<div className='button-items'>
						<CustomIcon
							className='spotify-icon'
							component={SpotifySvg}
						/>
						Sign in with Spotify
              			</div>
				</CustomButton>
				<code className='description'>
					<strong style={{ fontSize: '14px' }}>euphony</strong> <em>noun [ U ] /ˈjuː.fə.ni/</em>
					<br />
					agreeableness of sound; pleasing effect to the ear,
					especially a pleasant sounding or harmonious combination or succession of words.
              	</code>
			</div>
		</div>
	);
};

export default Homepage;