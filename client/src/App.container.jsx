import React from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import App from './App';

const getCurrentUserId = () => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) return null;

    const { userId } = jwtDecode(accessToken);

    return userId;
};

const AppContainer = () => {
    const isAuthed = getCurrentUserId() ? true : false;

    localStorage.setItem('currentUserId', getCurrentUserId());

    return (
        <App isAuthed={isAuthed} />
    )
};

export default AppContainer;