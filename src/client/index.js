

/*== Full React Client =========================================================

This module exports one React component, Client, which renders the entirety of
the UI for authenticated users. The Client functions primarily as view router,
displaying different views depending on the requested URL. It also wraps each
view in a coherent global template, currently consisting of nothing more than a
HeaderBar and central content area.

It accepts no props.

*/

//-- Dependencies --------------------------------
import React from 'react';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import ViewUser from '../views/user/index.js';
import ViewPost from '../views/post/index.js';
import ViewHome from '../views/home/index.js';
import ViewSettings from '../views/settings/index.js';
import ViewNotFound from '../views/not_found/index.js';
import HeaderBar from '../components/header_bar/index.js';
import './client.css';

//-- React Component -----------------------------
export default function Client() {
    return (
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
                    <ViewNotFound />
                </Route>
            </Switch>
        </div>
    );
}
