import { authActionTypes } from './auth.types';

export const updateIsAuthed = isAuthed => ({
    type: authActionTypes.UPDATE_IS_AUTHED,
    payload: isAuthed
});