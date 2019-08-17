import Cookies from 'js-cookie';
import * as actionTypes from './actions';

const initialState = {
    isAuthed: Cookies.get('userToken') ? true : false,
    user: {
        'sid': '',
        'name': '',
        'country': '',
        'profileImage': '',
        'profileUrl': '',
        mostPlayed: {
            'sid': '',
            'name': '',
            'artistName': '',
            'previewUrl': '',
            'coverImage': ''
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                user: {
                    'sid': action.payload.sid,
                    'name': action.payload.name,
                    'country': action.payload.country,
                    'profileImage': action.payload.profileImage,
                    'profileUrl': action.payload.profileUrl,
                    mostPlayed: {
                        'sid': action.payload.mostPlayed.sid,
                        'name': action.payload.mostPlayed.name,
                        'artistName': action.payload.mostPlayed.artistName,
                        'previewUrl': action.payload.mostPlayed.previewUrl,
                        'coverImage': action.payload.mostPlayed.coverImage
                    }
                }
            };
        default:
            return state;
    }
}

export default reducer;