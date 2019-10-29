import React from 'react';
import { useApolloClient } from "@apollo/react-hooks";
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
    const isAuthed = Cookies.get('accessToken') ? true : false;
    const client = useApolloClient();

    // Store current user id in Apollo local cache
    client.writeData(
        {
            data: {
                currentUserId: getCurrentUserId()
            }
        }
    );

    return (
        <App isAuthed={isAuthed} />
    )
};

export default AppContainer;