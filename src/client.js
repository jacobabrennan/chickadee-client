

//==============================================================================\

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as routing from 'react-router-dom';
import * as clientAPI from './client_api';
import ViewUser from './view_user/index.js';
import ViewPost from './view_post/index.js';
import ViewAuth from './view_auth/index.js';
import ViewFeed from './view_feed/index.js';
import './client.css';

//------------------------------------------------
function ViewLoading() {
    return <h1>Loading</h1>
}
function ViewNoRoute() {
    return '404';
}

//------------------------------------------------
export default function Client(props) {
    const [authenticatedUserId, setAuth] = useState(undefined);
    const routerHistory = routing.useHistory();
    // Request post from server
    useEffect(function () {
        clientAPI.userId().then(function (userId) {
            if(!userId) { return;}
            setAuth(userId);
        });
    }, []);
    //
    function handleLogin(userIdNew) {
        setAuth(userIdNew);
        routerHistory.push('/')
    }
    if(authenticatedUserId === undefined) {
        return <ViewLoading />
    }
    if(authenticatedUserId === null) {
        return <ViewAuth login={handleLogin} />
    }
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
