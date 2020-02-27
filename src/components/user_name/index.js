

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import { urlUserProfile } from '../../utilities.js';
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
        <routing.Link
            className="username"
            to={urlUserProfile(user.userId)}
            onClick={eventClick => eventClick.stopPropagation()}
            children={children}
        />
    );
}
