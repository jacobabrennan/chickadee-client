

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router }from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './server_api/apollo_client.js';
import Client from './client/index.js';
import { Authenticate } from './authentication/index.js';
import './reset.css';

//------------------------------------------------
ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <Router>
            <Authenticate>
                <Client />
            </Authenticate>
        </Router>
    </ApolloProvider>,
    document.getElementById('root'),
);
