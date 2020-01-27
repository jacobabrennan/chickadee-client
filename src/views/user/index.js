

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import Feed from '../../components/feed';
import * as routing from 'react-router-dom';
// import { userGet } from '../../server_api/index.js';
import './index.css';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

//------------------------------------------------
export default function ViewUser(props) {
    // const [user, setUser] = useState(undefined);
    // // Retrieve user id from url
    // const match = routing.useRouteMatch();
    // const userId = match.params.id;
    // // Request user from server
    // useEffect(function () {
    //     userGet(userId).then(function (result) {
    //         return setUser(result);
    //     });
    // }, [userId]);
    // // Display user
    // if(user === undefined) {
    //     return 'Requesting';
    // }
    // if(user === null) {
    //     return 'User not found';
    // }
    const userId = routing.useParams().userId;
    return (
        <React.Fragment>
            <UserInfo userId={userId} />
            <Feed userId={userId} />
        </React.Fragment>
    );
}


//==============================================================================

function UserInfo(props) {
    following
    return (
        <div className="userinfo">
            <span className="username">
                <routing.Link to={`${URL_USER_PROFILE}/${props.userId}`}>
                    {props.userId}
                </routing.Link>
            </span>
            <br />
            <button children="Follow" disabled={false} />
        </div>
    );
}