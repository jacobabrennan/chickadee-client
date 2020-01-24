

//==============================================================================

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as routing from 'react-router-dom';
import * as clientAPI from '../client_api.js';

//------------------------------------------------
export default function ViewUser() {
    const [user, setUser] = useState(undefined);
    // Retrieve user id from url
    const match = routing.useRouteMatch();
    const userId = match.params.id;
    // Request user from server
    useEffect(function () {
        clientAPI.userGet(userId).then(function (result) {
            return setUser(result);
        });
    }, [userId]);
    // Display user
    if(user === undefined) {
        return 'Requesting';
    }
    if(user === null) {
        return 'User not found';
    }
    return (
        <React.Fragment>
            Found the user
            <br />
            {user.id}
        </React.Fragment>
    );
}
