import request from 'request';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

import userRepository from './../repositories/user.repository';
import songRepository from './../repositories/song.repository';

// Spotify connection config
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const DASHBOARD_URI = process.env.DASHBOARD_URI;

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    login: async (req, res) => {
        // Access scope to authorize
        const scopes = [
            'user-read-private',
            'user-read-email',
            'user-top-read'
        ];

        res.redirect(
            'https://accounts.spotify.com/authorize?' +
            querystring.stringify(
                {
                    response_type: 'code',
                    client_id: SPOTIFY_CLIENT_ID,
                    scope: scopes.join(' '),
                    redirect_uri: REDIRECT_URI
                }
            )
        );
    },
    callback: async (req, res) => {
        const code = req.query.code || null;

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' +
                    (Buffer.from(
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
                        // Get most played song
                        const mostPlayedResponse = await axios.get(
                            'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1',
                            config
                        );
                        const mostPlayedData = mostPlayedResponse.data.items[0];
                        const songToUpsert = {
                            sid: mostPlayedData.id ? mostPlayedData.id : null,
                            name: mostPlayedData.name ? mostPlayedData.name : null,
                            artistName: mostPlayedData.artists[0] ? mostPlayedData.artists[0].name : null,
                            previewUrl: mostPlayedData.preview_url ? mostPlayedData.preview_url : null,
                            coverImage: mostPlayedData.album.images[0] ? mostPlayedData.album.images[0].url : null
                        };
                        const upsertedSong = await songRepository.upsertSong(songToUpsert);

                        // Get user
                        const userResponse = await axios.get(
                            'https://api.spotify.com/v1/me',
                            config
                        );
                        const userData = userResponse.data;
                        const userToUpsert = {
                            sid: userData.id ? userData.id : null,
                            name: userData.display_name ? userData.display_name : null,
                            country: userData.country ? userData.country : null,
                            profileImage: userData.images[0] ? userData.images[0].url : null,
                            profileUrl: userData.uri ? userData.uri : null,
                            mostPlayedId: upsertedSong._id ? upsertedSong._id : null
                        };
                        const upsertedUser = await userRepository.upsertUser(userToUpsert);

                        // Create access token
                        const tokenPayload = {
                            userId: upsertedUser._id
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
                            maxAge: 3600000,
                            sameSite: true
                        };

                        res.cookie('accessToken', accessToken, cookieConfig);
                        res.redirect(DASHBOARD_URI);
                    }
                );
            }
        });
    }
};

export default authController;