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
    },
    isFetching: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                isFetching: true
            };
        case userActionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentUser: action.payload
            };
        case userActionTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default reducer;