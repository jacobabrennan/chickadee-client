

//== Header Bar Component ======================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import * as routing from 'react-router-dom';
import authenticationContext from '../../authentication/index.js';
import { urlUserProfile } from '../../utilities/url_handling.js';
import './header_bar.css';


//-- Header Bar subcomponent ---------------------
export default function HeaderBar() {
    const authContext = useContext(authenticationContext);
    return (
        <header className="headerbar">
            <routing.Link
                className="headerbar_home"
                to="/"
                children="Home"
            />
            <div className="headerbar_etc">
                <routing.Link
                    to={urlUserProfile(authContext.userData.userId)}
                    children="Profile"
                />
                <button
                    children="Log Out"
                    className="button secondary"
                    onClick={authContext.onLogout}
                />
            </div>
        </header>
    );
}
