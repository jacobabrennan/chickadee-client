

//==============================================================================\

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from "react-router-dom";

//------------------------------------------------\
function ViewUser() {
    let match = routing.useRouteMatch();
    return `User:${match.params.id}`;
}
function ViewPost() {
    let match = routing.useRouteMatch();
    return `Post:${match.params.id}`;
}
function ViewFeed() {
    return 'Feed';
}
function ViewNoRoute() {
    return '404';
}


//------------------------------------------------
export default function Client(props) {
    return (
        <routing.BrowserRouter>
            <routing.Switch>
                <routing.Route path="/user/:id">
                    <ViewUser />
                </routing.Route>
                <routing.Route path="/post/:id">
                    <ViewPost />
                </routing.Route>
                <routing.Route exact path="/">>
                    <ViewFeed />
                </routing.Route>
                <routing.Route>
                    <ViewNoRoute />
                </routing.Route>
            </routing.Switch>
        </routing.BrowserRouter>
    );
}
