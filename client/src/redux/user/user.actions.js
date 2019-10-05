import Cookies from 'js-cookie';
import axios from 'axios';

import { userActionTypes } from './user.types';

export const fetchUserStart = () => ({
    type: userActionTypes.FETCH_USER_START
});

export const fetchUserSuccess = user => ({
    type: userActionTypes.FETCH_USER_SUCCESS,
    payload: user
});

export const fetchUserFailure = errorMessage => ({
    type: userActionTypes.FETCH_USER_FAILURE,
    payload: errorMessage
});

export const fetchUserStartAsync = () => {
    return dispatch => {
        const accessToken = Cookies.get('userToken')
        const config = {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        };

        dispatch(fetchUserStart());

        const fetchUser = async () => {
            let userResponse = await axios.get('https://api.spotify.com/v1/me', config);
            const userData = userResponse.data;

            let mostPlayedResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1', config);
            const mostPlayedData = mostPlayedResponse.data.items[0];

            const user = {
                sid: userData.id ? userData.id : null,
                name: userData.display_name ? userData.display_name : null,
                country: userData.country ? userData.country : null,
                profileImage: userData.images[0] ? userData.images[0].url : null,
                profileUrl: userData.uri ? userData.uri : null,
                mostPlayed: {
                    sid: mostPlayedData.id ? mostPlayedData.id : null,
                    name: mostPlayedData.name ? mostPlayedData.name : null,
                    artistName: mostPlayedData.artists[0] ? mostPlayedData.artists[0].name : null,
                    previewUrl: mostPlayedData.preview_url ? mostPlayedData.preview_url : null,
                    coverImage: mostPlayedData.album.images[0] ? mostPlayedData.album.images[0].url : null
                }
            };

            dispatch(fetchUserSuccess(user));
        };

        try {
            fetchUser();
        } catch (error) {
            dispatch(fetchUserFailure(error.message));
        }
    };
};