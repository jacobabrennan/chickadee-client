

//== User View =================================================================

//-- Dependencies --------------------------------
import React from 'react';
import {
    useParams,
    useRouteMatch,
    Switch,
    Route,
} from 'react-router-dom';
import UserActivity from './activity.js';
import {
    UserFollowers,
    UserFollows,
} from './followers.js';
import './index.css';

//-- React Component -----------------------------
export default function ViewUser() {
    // NOTE: Handle case where user doesn't exist (redirect via history)
    //
    const userId = useParams().userId;
    const route = useRouteMatch();
    // Render JSX
    return (
        <Switch>
            <Route exact path={route.url}>
                <UserActivity userId={userId} />
            </Route>
            <Route exact path={`${route.path}/followers`}>
                <UserFollowers userId={userId} />
            </Route>
            <Route exact path={`${route.path}/follows`}>
                <UserFollows userId={userId} />
            </Route>
        </Switch>
    );
}
