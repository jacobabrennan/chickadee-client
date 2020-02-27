

//== Authentication Client and route handler ===================================

//-- Dependencies --------------------------------
import React, { useState } from 'react';
import {
    useHistory,
    Switch,
    Route,
    Redirect,
    Link,
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { register, login, logout } from './api.js';
import { QUERY_authGet } from '../server_api/graphql_queries.js';
import Loading from '../components/loading/index.js';
import './index.css';

//-- Project Constants ---------------------------
const AUTH_OUT = 'logged out';
const AUTH_UNKNOWN = null;

//-- Authentication Context ----------------------
const authenticationContext = React.createContext({
    userData: null,
});
export default authenticationContext;

//-- Authentication Wraper -----------------------
export function Authenticate(props) {
    const [authData, setAuthData] = useState(AUTH_UNKNOWN);
    const history = useHistory();
    const response = useQuery(QUERY_authGet, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache',
        onCompleted: function (data) {
            const userData = data.authGet;
            if(!userData) {
                setAuthData(AUTH_OUT);
                return;
            }
            setAuthData({
                userData: userData,
                onLogout: async function () {
                    await logout();
                    setAuthData(AUTH_OUT);
                    history.push('/auth/login');
                },
            });
        },
    });
    // Display loading screen until authentication check completes
    if(response.loading || authData === AUTH_UNKNOWN) {
        return (<Loading />);
    }
    // Display authentication subclient
    if(authData === AUTH_OUT) {
        return <ViewAuth onLogin={response.refetch} />
    }
    // Display Contents
    return (
        <authenticationContext.Provider
            value={authData}
            children={props.children}
        />
    );
}

//== Sub Components ============================================================

//-- Main Routing --------------------------------
/*
    Note: Log Out route not currently handled here, as this component only
    renders when the user IS NOT logged in.
*/
export function ViewAuth(props) {
    // Render JSX
    return (
        <Switch>
            <Route exact path="/auth/login">
                <FormLogin login={props.onLogin} />
            </Route>
            <Route exact path="/auth/register">
                <FormRegister login={props.onLogin} />
            </Route>
            <Route path="/">
                <Redirect to="/auth/login" />
            </Route>
        </Switch>
    );
}

//-- Registration Form ---------------------------
function FormRegister(props) {
    //
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        let userName = eventSubmit.currentTarget.elements.username.value;
        let password = eventSubmit.currentTarget.elements.password.value;
        let email = eventSubmit.currentTarget.elements.email.value;
        register(userName, password, email).then(function (userId) {
            if(userId) {
                props.login(userId);
            }
        });
    }
    //
    return (
        <div className="auth_modal">
            <form className="auth_form" onSubmit={handleSubmit}>
                <span className="auth_prompt">Register</span>
                <input
                    name="username"
                    type="text"
                    placeholder="User Name"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <div className="auth_actions">
                    <button className="button" type="submit" children="Submit" />
                    <Link
                        className="button secondary"
                        to="/auth/login"
                        children="Log in"
                    />
                </div>
            </form>
        </div>
    );
}    

//-- Log In Form ---------------------------------
function FormLogin(props) {
    //
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        let userName = eventSubmit.currentTarget.elements.username.value;
        let password = eventSubmit.currentTarget.elements.password.value;
        login(userName, password).then(function (userId) {
            if(userId) {
                props.login(userId);
            }
        });
    }
    //
    return (
        <div className="auth_modal">
            <form className="auth_form" onSubmit={handleSubmit}>
                <span className="auth_prompt">Log in</span>
                <input
                    name="username"
                    type="text"
                    placeholder="User Name"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <div className="auth_actions">
                    <button className="button" type="submit" children="Submit" />
                    <Link
                        className="button secondary"
                        to="/auth/register"
                        children="Register"
                    />
                </div>
            </form>
        </div>
    );
}
