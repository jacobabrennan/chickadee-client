

//== Registration Form =========================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import { register } from './api';

//-- React Component -----------------------------
export default function ViewRegister({ onLogin }) {
    // Submit interaction handler
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        const userName = eventSubmit.currentTarget.elements.username.value;
        const password = eventSubmit.currentTarget.elements.password.value;
        const email = eventSubmit.currentTarget.elements.email.value;
        register(userName, password, email).then(function (userId) {
            if(!userId) { return;}
            onLogin(userId);
        });
    }
    // Render JSX
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
