import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectIsAuthed = createSelector(
    [selectAuth],
    auth => auth.isAuthed
);