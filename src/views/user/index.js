

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import UserActivity from './activity.js';
import {
    UserFollowers,
    UserFollows,
} from './followers.js';
import './index.css';

//-- Project Constants ---------------------------
//------------------------------------------------
export default function ViewUser() {
    // NOTE: Handle case where user doesn't exist (redirect via history)
    //
    const userId = routing.useParams().userId;
    const route = routing.useRouteMatch();
    // Render JSX
    return (
        <routing.Switch>
            <routing.Route exact path={route.url}>
                <UserActivity userId={userId} />
            </routing.Route>
            <routing.Route exact path={`${route.path}/followers`}>
                <UserFollowers userId={userId} />
            </routing.Route>
            <routing.Route exact path={`${route.path}/follows`}>
                <UserFollows userId={userId} />
            </routing.Route>
        </routing.Switch>
    );
}
