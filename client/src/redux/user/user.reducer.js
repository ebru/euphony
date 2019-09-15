import Cookies from 'js-cookie';
import { userActionTypes } from './user.types';

const initialState = {
    isAuthed: Cookies.get('userToken') ? true : false,
    currentUser: {
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
        case userActionTypes.UPDATE_USER:
            return {
                ...state,
                currentUser: {
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