import { userActionTypes } from './user.types';

export const updateUser = user => ({
    type: userActionTypes.UPDATE_USER,
    payload: user
});