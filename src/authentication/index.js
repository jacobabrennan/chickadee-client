

/*== Authentication Client and route handler ===================================

This module exports a React context, authentication, which provides user data
for the currently logged in user.

This module also exports a React component, Authenticate, which acts as a
wrapper around the rest of the client. The component provides authentication
data to the authentication context when the user is logged in. Otherwise, it
displays registration and login views allowing the user to authenticate.
It accepts one prop, the standard React prop "children".

*/

//-- Dependencies --------------------------------
// NPM Modules
import React, {
    useState,
    createContext,
} from 'react';
import {
    useHistory,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
// Utilities
import { logout } from './api.js';
import { QUERY_authGet } from '../server_api/graphql_queries.js';
import {
    URL_AUTH_LOGIN,
    URL_AUTH_REGISTER,
} from '../utilities/constants.js';
// React Components
import Loading from '../components/loading/index.js';
import ViewRegister from './view_registration.js';
import ViewLogin from './view_login.js';
// Styles
import './index.css';

//-- Project Constants ---------------------------
const AUTH_OUT = 'logged out';
const AUTH_UNKNOWN = null;

//-- Authentication Context ----------------------
const authenticationContext = createContext({
    userData: null,
});
export default authenticationContext;

//-- React Component -----------------------------
export function Authenticate({ children }) {
    // Setup auth data state
    const [authData, setAuthData] = useState(AUTH_UNKNOWN);
    // Query server for authentication data
    const history = useHistory();
    const response = useQuery(QUERY_authGet, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache',
        onCompleted: function ({ authGet }) {
            // Log out user if response is empty
            if(!authGet) {
                setAuthData(AUTH_OUT);
                return;
            }
            // Log in user and re-render
            setAuthData({
                userData: authGet,
                onLogout: async function () {
                    await logout();
                    setAuthData(AUTH_OUT);
                    history.push(URL_AUTH_LOGIN);
                },
            });
        },
    });
    // Display loading screen until authentication check completes
    if(response.loading || authData === AUTH_UNKNOWN) {
        return (<Loading />);
    }
    // If authenticated, pass authentication data to wrapped components
    if(authData !== AUTH_OUT) {
        return (
            <authenticationContext.Provider
                value={authData}
                children={children}
            />
        );
    }
    // Display authentication subclient
    return (
        <Switch>
            <Route exact path={URL_AUTH_LOGIN}>
                <ViewLogin onLogin={response.refetch} />
            </Route>
            <Route exact path={URL_AUTH_REGISTER}>
                <ViewRegister onLogin={response.refetch} />
            </Route>
            <Route path="/">
                <Redirect to={URL_AUTH_LOGIN} />
            </Route>
        </Switch>
    );
}
