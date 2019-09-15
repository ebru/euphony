import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Cookies from 'js-cookie';
import './Dashboard.scss';
// import Sound from 'react-sound';
import Header from '../../components/Header/Header';
import * as actionTypes from '../../store/actions';

const Dashboard = props => {
  useEffect(() => {
    const getGraphQLTest = async () => {
      const query = `query {
        hello
      }`;

      let testResponse = await axios.post(
        'http://localhost/api',
        {
          query: query,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
      const testData = testResponse.data;

      return testData;
    }

    getGraphQLTest()
      .then(testData => {
        console.log(testData.data);
      });

    const getUser = async () => {
      const accessToken = Cookies.get('userToken')
      const config = {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      };

      let userResponse = await axios.get('https://api.spotify.com/v1/me', config);
      const userData = userResponse.data;

      let mostPlayedResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1', config);
      const mostPlayedData = mostPlayedResponse.data.items[0];

      const user = {
        'sid': userData.id,
        'name': userData.display_name,
        'country': userData.country,
        'profileImage': userData.images[0].url,
        'profileUrl': userData.uri,
        'mostPlayed': {
          'sid': mostPlayedData.id,
          'name': mostPlayedData.name,
          'artistName': mostPlayedData.artists[0].name,
          'previewUrl': mostPlayedData.preview_url,
          'coverImage': mostPlayedData.album.images[0].url
        }
      }

      props.updateUser(user);

      return user;
    }

    const cachedUser = JSON.parse(localStorage.getItem('cachedUser'));
    let isCacheExpired = false;

    if (cachedUser) {
      const timestamp = cachedUser.timestamp;
      const current = new Date().getTime().toString();

      // Expire the cache after one day
      if (Math.ceil((current - timestamp + 1) / 86400000) > 1)
        isCacheExpired = true;
    }

    if (cachedUser && !isCacheExpired) {
      // Get most played data from cache on local storage
      props.updateUser({
        'sid': cachedUser.sid,
        'name': cachedUser.name,
        'country': cachedUser.country,
        'profileImage': cachedUser.profileImage,
        'profileUrl': cachedUser.profileUrl,
        'mostPlayed': {
          'sid': cachedUser.mostPlayed.sid,
          'name': cachedUser.mostPlayed.name,
          'artistName': cachedUser.mostPlayed.artistName,
          'previewUrl': cachedUser.mostPlayed.previewUrl,
          'coverImage': cachedUser.mostPlayed.coverImage
        }
      });
    } else {
      // Fetch from Spotify and cache the response on local storage
      getUser()
        .then(user => {
          const userToCache = {
            ...user,
            'timestamp': new Date().getTime()
          };

          localStorage.setItem('cachedUser', JSON.stringify(userToCache));
        });
    }
  }, []);

  return (
    <div className='Dashboard'>
      <div className='Main-container'>
        <div className='Dashboard-container'>
          <p><em>most played so far</em></p>
          <h1>{props.user.mostPlayed.name}</h1>
          <p><em>by {props.user.mostPlayed.artistName}</em></p>
          {
            // props.mostPlayed.previewUrl
            //   ? <Sound url={props.mostPlayed.previewUrl} playStatus={Sound.status.PLAYING} />
            //   : null
          }
        </div>
      </div>
    </div >
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch({ type: actionTypes.UPDATE_USER, payload: user })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
