import Cookies from 'js-cookie';
import { authActionTypes } from './auth.types';

const initialState = {
    isAuthed: Cookies.get('userToken') ? true : false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.UPDATE_IS_AUTHED:
            return {
                ...state,
                isAuthed: action.payload.isAuthed
            };
        default:
            return state;
    }
}

export default reducer;