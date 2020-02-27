

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import * as routing from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './server_api/apollo_client.js';
import Client from './client/index.js';
import './reset.css';

//------------------------------------------------
ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <routing.BrowserRouter>
            <Client />
        </routing.BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
);
