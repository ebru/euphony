import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectIsAuthed = createSelector(
    [selectUser],
    user => user.isAuthed
);

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);