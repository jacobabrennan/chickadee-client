

//== Authentication Client and route handler ===================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import { register, login } from './api.js';
import './index.css';

//-- Authentication Context ----------------------
export const authenticationContext = React.createContext(null);


//== Main Component ============================================================
/*
    Note: Log Out route not currently handled here, as this component only
    renders when the user IS NOT logged in.
*/

export default function ViewAuth(props) {
    return (
        <routing.Switch>
            <routing.Route exact path="/login">
                <FormLogin login={props.login} />
            </routing.Route>
            <routing.Route exact path="/register">
                <FormRegister login={props.login} />
            </routing.Route>
            <routing.Route exact path="*">
                <routing.Redirect to="/login" />
            </routing.Route>
        </routing.Switch>
    );
}


//== Sub Components ============================================================

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
                    <button className="button" type="submit" children="Register" />
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
                    <button className="button" type="submit" children="Log in" />
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
