

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import * as routing from 'react-router-dom';
import './reset.css';
import Client from './client.js';

//------------------------------------------------
ReactDOM.render(
    <routing.BrowserRouter><Client /></routing.BrowserRouter>,
    document.getElementById('root'),
);
