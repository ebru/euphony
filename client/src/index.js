import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

let API_URL = 'https://localhost/api/graphql';

if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://euphony.me/api/graphql'
}

const httpLink = createHttpLink({
    uri: API_URL
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
