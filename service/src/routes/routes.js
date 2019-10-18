import express from 'express';
import request from 'request';
import querystring from 'querystring';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import Song from '../models/song';

const router = express.Router();

// Spotify connection config
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const DASHBOARD_URI = process.env.DASHBOARD_URI;

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

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
      const spotifyToken = body.access_token;

      const addUser = async () => {
        const config = {
          headers: { 'Authorization': 'Bearer ' + spotifyToken }
        };

        try {
          const userResponse = await axios.get('https://api.spotify.com/v1/me', config);
          const userData = userResponse.data;

          const mostPlayedResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1', config);
          const mostPlayedData = mostPlayedResponse.data.items[0];

          const user = {
            sid: userData.id ? userData.id : null,
            name: userData.display_name ? userData.display_name : null,
            country: userData.country ? userData.country : null,
            profileImage: userData.images[0] ? userData.images[0].url : null,
            profileUrl: userData.uri ? userData.uri : null,
            mostPlayedSid: mostPlayedData.id ? mostPlayedData.id : null
          };

          User.findOneAndUpdate(
            { sid: userData.id },
            { $set: user },
            { new: true, upsert: true },
            (error, result) => {
              if (error)
                console.log('Error occured while saving the user: ' + userData.id);
            }
          );

          const song = {
            sid: mostPlayedData.id ? mostPlayedData.id : null,
            name: mostPlayedData.name ? mostPlayedData.name : null,
            artistName: mostPlayedData.artists[0] ? mostPlayedData.artists[0].name : null,
            previewUrl: mostPlayedData.preview_url ? mostPlayedData.preview_url : null,
            coverImage: mostPlayedData.album.images[0] ? mostPlayedData.album.images[0].url : null
          };

          Song.findOneAndUpdate(
            { sid: mostPlayedData.id },
            { $set: song },
            { upsert: true, new: true },
            (error, result) => {
              if (error)
                console.log('Error occured while saving the song: ' + mostPlayedData.id);
            }
          );

          const tokenPayload = {
            sid: user.sid
          };

          const accessToken = jwt.sign(
            tokenPayload,
            JWT_SECRET,
            { expiresIn: 3600000 }
          );

          return accessToken;
        } catch (error) {
          console.error(error)
        }
      };

      addUser().then(
        accessToken => {
          const cookieConfig = {
            maxAge: 3600000
          };

          res.cookie('accessToken', accessToken, cookieConfig);
          res.redirect(DASHBOARD_URI);
        }
      );
    }
  });
});

export default router;