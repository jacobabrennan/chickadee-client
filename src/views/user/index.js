

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import Feed from '../../components/feed.js';
import UserInfo from '../../components/user_info.js';
import './index.css';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function ViewUser(props) {
    const userId = routing.useParams().userId;
    return (
        <React.Fragment>
            <UserInfo userId={userId} />
            <Feed userId={userId} />
        </React.Fragment>
    );
}
