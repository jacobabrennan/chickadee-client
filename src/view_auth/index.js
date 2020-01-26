

//== Authentication Client and route handler ===================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import * as clientAPI from '../client_api.js';
import './index.css';

//-- Main Component ------------------------------
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
        clientAPI.register(userName, password, email).then(function (userId) {
            if(userId) {
                props.login(userId);
            }
        });
    }
    //
    return (
        <React.Fragment>
            <form className="auth auth_login" onSubmit={handleSubmit}>
                Register
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
                <button type="submit">Log in</button>
            </form>
            <routing.Link to="/login">Login</routing.Link>
        </React.Fragment>
    );
}    

//-- Log In Form ---------------------------------
function FormLogin(props) {
    //
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        let userName = eventSubmit.currentTarget.elements.username.value;
        let password = eventSubmit.currentTarget.elements.password.value;
        clientAPI.login(userName, password).then(function (userId) {
            if(userId) {
                props.login(userId);
            }
        });
    }
    //
    return (
        <React.Fragment>
            <form className="auth auth_login" onSubmit={handleSubmit}>
                Login
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
                <button type="submit">Log in</button>
            </form>
            <routing.Link to="/register">Register</routing.Link>
        </React.Fragment>
    );
}
