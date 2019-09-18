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