

//== Login Form ================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from './api';

//-- Log In Form ---------------------------------
export default function ViewLogin({ onLogin }) {
    // Submit interaction handler
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        const userName = eventSubmit.currentTarget.elements.username.value;
        const password = eventSubmit.currentTarget.elements.password.value;
        login(userName, password).then(function (userId) {
            if(!userId) { return;}
            onLogin(userId);
        });
    }
    // Render JSX
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
