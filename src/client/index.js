

//== Full React Client =========================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
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
                <routing.Switch>
                    <routing.Route path="/auth">
                        <routing.Redirect to="/" />
                    </routing.Route>
                    <routing.Route path="/user/:userId">
                        <ViewUser />
                    </routing.Route>
                    <routing.Route path="/post/:postId">
                        <ViewPost />
                    </routing.Route>
                    <routing.Route exact path="/settings">
                        <ViewSettings />
                    </routing.Route>
                    <routing.Route exact path="/">
                        <ViewHome />
                    </routing.Route>
                    <routing.Route>
                        <ViewNoRoute />
                    </routing.Route>
                </routing.Switch>
            </div>
        </Authenticate>
    );
}

//-- Sub Components ------------------------------
function ViewNoRoute() {
    return '404';
}
