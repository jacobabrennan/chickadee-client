

//== Full React Client =========================================================\

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import * as routing from 'react-router-dom';
import { getId, logout } from './server_api/index.js';
import ViewUser from './views/user/index.js';
import ViewPost from './views/post/index.js';
import ViewAuth from './views/authentication/index.js';
import ViewHome from './views/home/index.js';
import './client.css';

//-- Project Constants ---------------------------
const USER_LOADING = undefined;
const USER_NONE = null;
const ACTION_AUTH_SUCCESS = 'success';
const ACTION_AUTH_FAIL = 'fail';
const ACTION_AUTH_LOGOUT = 'logout';

//-- Sub Components ------------------------------
function ViewLoading() {
    return <h1>Loading</h1>
}
function ViewNoRoute() {
    return '404';
}

//-- Initial State -------------------------------
const stateInitial = {
    userId: undefined,
};

//-- Action Reducer ------------------------------
function reducer(state, action) {
    const newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_AUTH_SUCCESS: {
            newState.userId = action.userId;
            break;
        }
        case ACTION_AUTH_FAIL: {
            newState.userId = null;
            break;
        }
        case ACTION_AUTH_LOGOUT: {
            newState.userId = null;
            break;
        }
        // Default: Needed because React whines
        default: {}
    }
    return newState;
}

//-- Main Client Component -----------------------
export default function Client(props) {
    // Setup hooks
    const [state, dispatch] = useReducer(reducer, stateInitial);
    const routerHistory = routing.useHistory();
    // Request check authentication
    function attemptAuth() {
        getId().then(function (userId) {
            if(!userId) {
                dispatch({type: ACTION_AUTH_FAIL});
                return;
            }
            dispatch({
                type: ACTION_AUTH_SUCCESS,
                userId: userId,
            });
        });
    }
    useEffect(attemptAuth, []);
    // Show loading screen until authentication check completes
    if(state.userId === USER_LOADING) {
        return <ViewLoading />
    }
    // If confirmed not authenticated, render authentication sub-client
    if(state.userId === USER_NONE) {
        function handleLogin(userIdNew) {
            dispatch({
                type:ACTION_AUTH_SUCCESS,
                userId: userIdNew,
            });
            routerHistory.push('/')
        }
        return <ViewAuth login={handleLogin} />
    }
    // Interaction Handlers
    function handleLogout() {
        logout().then(function () {
            dispatch({type: ACTION_AUTH_LOGOUT});
        });
    }
    // Render normal client
    return (
        <React.Fragment>
            <HeaderBar logout={handleLogout} />
            <routing.Switch>
                <routing.Route path="/user/:userId">
                    <ViewUser />
                </routing.Route>
                <routing.Route path="/post/:id">
                    <ViewPost />
                </routing.Route>
                <routing.Route exact path="/">
                    <ViewHome />
                </routing.Route>
                <routing.Route>
                    <ViewNoRoute />
                </routing.Route>
            </routing.Switch>
        </React.Fragment>
    );
}

//-- Header Bar subcomponent ---------------------
function HeaderBar(props) {
    return (
        <header className="headerbar">
            <routing.Link to="/">Home</routing.Link>
            <button
                children="Logout"
                onClick={props.logout}
            />
        </header>
    );
}