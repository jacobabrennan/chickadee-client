

/*== Header Bar Component ======================================================

Exports a single React Component, HeaderBar. It displays a horizontal bar at the
top of client, containing branding, authentication actions (currently, log out),
and global links (currently, a link to the user's profile).

- Does not use any props.

*/

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authenticationContext from '../../authentication/index.js';
import { urlUserProfile } from '../../utilities/url_handling.js';
import './header_bar.css';

//-- Header Bar subcomponent ---------------------
export default function HeaderBar() {
    // Retrieve authentication data
    const authContext = useContext(authenticationContext);
    // Render JSX: Currently renders home & profile links, and a logout button.
    return (
        <header className="headerbar">
            <Link
                className="headerbar_home"
                to="/"
                children="Home"
            />
            <div className="headerbar_etc">
                <Link
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
