

//== Header Bar Component ======================================================

//-- Dependencies --------------------------------
import React, { useContext } from "react";
import * as routing from "react-router-dom";
import { authenticationContext } from "../server_api/index_old";
import './header_bar.css';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

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
                    children="Logout"
                    onClick={userData.onLogout}
                />
            </div>
        </header>
    );
}
