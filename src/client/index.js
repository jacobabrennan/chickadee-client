

//== Full React Client =========================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { Authenticate } from '../authentication/index.js';
import ViewUser from '../views/user/index.js';
import ViewPost from '../views/post/index.js';
import ViewHome from '../views/home/index.js';
import ViewSettings from '../views/settings/index.js';
import HeaderBar from '../components/header_bar/index.js';
import './client.css';

//-- Main Client Component -----------------------
export default function Client() {
    // Render normal client
    return (
        <Authenticate>
            <div className="client">
                <HeaderBar />
                <Switch>
                    <Route path="/auth">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/user/:userId">
                        <ViewUser />
                    </Route>
                    <Route path="/post/:postId">
                        <ViewPost />
                    </Route>
                    <Route exact path="/settings">
                        <ViewSettings />
                    </Route>
                    <Route exact path="/">
                        <ViewHome />
                    </Route>
                    <Route>
                        <ViewNoRoute />
                    </Route>
                </Switch>
            </div>
        </Authenticate>
    );
}

//-- Sub Components ------------------------------
function ViewNoRoute() {
    return '404';
}
