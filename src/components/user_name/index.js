

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import { urlUserProfile } from '../../utilities/url_handling.js';
import './user_name.css';

//------------------------------------------------
export default function UserName({user, noLink}) {
    let children = (
        <React.Fragment>
            <span className="username_name" children={user.name || user.userId} />
            <span className="username_id" children={user.userId} />
        </React.Fragment>
    );
    if(noLink) {
        return (<div className="username" children={children} />);
    }
    return (
        <Link
            className="username"
            to={urlUserProfile(user.userId)}
            onClick={eventClick => eventClick.stopPropagation()}
            children={children}
        />
    );
}
