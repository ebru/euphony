import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';

import './index.css';
import { default as App } from './App.container';
import * as serviceWorker from './serviceWorker';

let API_URL = 'https://localhost/api/graphql';

if (process.env.NODE_ENV === 'production') {
    API_URL = 'http://euphony.me/api/graphql'
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
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
