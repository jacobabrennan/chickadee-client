

//== Full React Client =========================================================\

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as routing from 'react-router-dom';
import * as clientAPI from './client_api';
import ViewUser from './view_user/index.js';
import ViewPost from './view_post/index.js';
import ViewAuth from './view_auth/index.js';
import ViewFeed from './view_feed/index.js';
import './client.css';

//-- Sub Components ------------------------------
function ViewLoading() {
    return <h1>Loading</h1>
}
function ViewNoRoute() {
    return '404';
}

//-- Main Client Component -----------------------
export default function Client(props) {
    // Setup hooks
    const [authenticatedUserId, setAuth] = useState(undefined);
    const routerHistory = routing.useHistory();
    // Request check authentication
    useEffect(function () {
        clientAPI.getId().then(function (userId) {
            if(!userId) { userId = null;}
            setAuth(userId);
        });
    }, []);
    // Show loading screen until authentication check completes
    if(authenticatedUserId === undefined) {
        return <ViewLoading />
    }
    // If confirmed not authenticated, render authentication sub-client
    if(authenticatedUserId === null) {
        function handleLogin(userIdNew) {
            setAuth(userIdNew);
            routerHistory.push('/')
        }
        return <ViewAuth login={handleLogin} />
    }
    // Render normal client
    return (
        <routing.Switch>
            <routing.Route path="/user/:id">
                <ViewUser />
            </routing.Route>
            <routing.Route path="/post/:id">
                <ViewPost />
            </routing.Route>
            <routing.Route exact path="/">
                <ViewFeed />
            </routing.Route>
            <routing.Route>
                <ViewNoRoute />
            </routing.Route>
        </routing.Switch>
    );
}
