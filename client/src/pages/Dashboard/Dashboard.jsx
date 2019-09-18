import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import Cookies from 'js-cookie';

import MostPlayed from '../../components/MostPlayed/MostPlayed';

import { updateUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './Dashboard.scss';

const Dashboard = props => {
  const { updateUser, currentUser: { mostPlayed } } = props;

  useEffect(() => {
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

      updateUser(user);
    }

    // Fetch user info from spotify
    getUser()
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
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
