import express from 'express';
import request from 'request';
import querystring from 'querystring';

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
    'user-top-read',
    'user-read-currently-playing'];

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

      res.cookie('userToken', accessToken, { maxAge: 3600000 });
      res.redirect(DASHBOARD_URI);
    }
  });
});

export default router;