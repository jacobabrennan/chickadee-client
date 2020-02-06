

//== Header Bar Component ======================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import * as routing from 'react-router-dom';
import { authenticationContext } from '../authentication/index.js';
import { URL_USER_PROFILE } from '../constants.js';
import './header_bar.css';


//-- Header Bar subcomponent ---------------------
export default function HeaderBar() {
    const userData = useContext(authenticationContext);
    const userUrl = `${URL_USER_PROFILE}/${userData.userId}`;
    return (
        <header className="headerbar">
            <routing.Link
                className="headerbar_home"
                to="/"
                children="Home"
            />
            <div className="headerbar_etc">
                <routing.Link
                    to={userUrl}
                    children="Profile"
                />
                <button
                    children="Log Out"
                    className="button secondary"
                    onClick={userData.onLogout}
                />
            </div>
        </header>
    );
}
