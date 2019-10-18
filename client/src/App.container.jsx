import React from 'react';
import Cookies from 'js-cookie';

import App from './App';

const AppContainer = () => {
    const isAuthed = Cookies.get('accessToken') ? true : false

    return (
        <App isAuthed={isAuthed} />
    )
};

export default AppContainer;