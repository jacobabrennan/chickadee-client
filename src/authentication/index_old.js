

//== Authentication Client and route handler ===================================

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as routing from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { register, login, logout } from './api.js';
import { QUERY_authGet } from '../server_api/graphql_queries.js';
import Loading from '../components/loading.js';
import './index.css';

//-- Authentication Context ----------------------
const authenticationContext = React.createContext({
    userData: null,
});
export default authenticationContext;

//-- Authentication Wraper -----------------------
export function Authenticate(props) {
    // Setup hooks
    const [authData, setAuthData] = useState();
    const history = routing.useHistory();
    // If not authenticated, render authentication sub-client
    if(!authData) {
        return (
            <ViewAuth
                onLogin={
                    function(data) {
                        setAuthData(data);
                    }
                }
                onLogout={
                    function () {
                        setAuthData(null);
                    }
                }
            />
        );
    }
    // Render JSX
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
    //
    const response = useQuery(QUERY_authGet, {
        fetchPolicy: 'no-cache',
        // Use useEffect instead of onCompleted, due to bug:
        // https://github.com/apollographql/react-apollo/issues/2177
    });
    //
    useEffect(function () {
        if(!response.data || !response.data.authGet) { return;}
        props.onLogin({
            userData: response.data.authGet,
            onLogout: function () {
                logout().then(function () {
                    props.onLogout();
                });
            },
        })
    }, [response.data, props])
    // Show loading screen until authentication check completes
    if(response.loading) {
        return (<Loading />);
    }
    // Render JSX
    return (
        <routing.Switch>
            <routing.Route exact path="/login">
                <FormLogin login={response.refetch} />
            </routing.Route>
            <routing.Route exact path="/register">
                <FormRegister login={response.refetch} />
            </routing.Route>
            <routing.Route exact path="*">
                <FormLogin login={response.refetch} />
            </routing.Route>
        </routing.Switch>
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
                    <routing.Link
                        className="button secondary"
                        to="/login"
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
                    <routing.Link
                        className="button secondary"
                        to="/register"
                        children="Register"
                    />
                </div>
            </form>
        </div>
    );
}
