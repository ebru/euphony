import { userActionTypes } from './user.types';

const initialState = {
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
                currentUser: action.payload
            };
        default:
            return state;
    }
}

export default reducer;