import express from 'express';
import request from 'request';
import querystring from 'querystring';
import axios from 'axios';
import User from '../models/user';
import Song from '../models/song';

const router = express.Router();

// Spotify connection config
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const DASHBOARD_URI = process.env.DASHBOARD_URI;

// Test endpoint
router.get('/test', (err, res) => {
  res.status(200).json({
    working: true
  });
});

// Login endpoint
router.get('/login', (req, res) => {
  // Access scope to authorize
  const scopes = ['user-read-private',
    'user-read-email',
    'user-top-read'
  ];

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: scopes.join(' '),
      redirect_uri: REDIRECT_URI
    }));
});

// Callback endpoint
router.get('/callback', (req, res) => {
  let code = req.query.code || null;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;

      const addUser = async () => {
        const config = {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        };

        try {
          let userResponse = await axios.get('https://api.spotify.com/v1/me', config);
          const userData = userResponse.data;

          let mostPlayedResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1', config);
          const mostPlayedData = mostPlayedResponse.data.items[0];

          let user = new User({
            sid: userData.id,
            name: userData.display_name,
            country: userData.country,
            profileImage: userData.images[0].url,
            profileUrl: userData.uri,
            mostPlayedSid: mostPlayedData.id
          });

          user.save();

          let song = new Song({
            sid: mostPlayedData.id,
            name: mostPlayedData.name,
            artistName: mostPlayedData.artists[0].name,
            previewUrl: mostPlayedData.preview_url,
            coverImage: mostPlayedData.album.images[0].url
          });

          song.save();
        } catch (error) {
          console.error(error)
        }
      };

      addUser();

      res.cookie('userToken', accessToken, { maxAge: 3600000 });
      res.redirect(DASHBOARD_URI);
    }
  });
});

export default router;