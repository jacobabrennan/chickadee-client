

//== Followers =================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
    QUERY_followersGet,
    QUERY_followsGet,
} from '../../server_api/graphql_queries.js';
import authenticationContext from '../../authentication/index.js';
import { urlUserProfile } from '../../utilities/url_handling.js';
import { ButtonFollowToggle } from '../../components/button/index.js';
import Loading from '../../components/loading/index.js';
import Portrait from '../../components/portrait/index.js';
import UserName from '../../components/user_name/index.js';


//== React Components ==========================================================

//-- User Followers ------------------------------
export function UserFollowers({ userId }) {
    //
    const variables = { userId };
    const response = useQuery(QUERY_followersGet, { variables });
    //
    if(response.loading) {
        return (<Loading />);
    }
    // NOTE: Stretegy for error handling not yet determined
    if(response.error) {
        return `${response.error}`;
    }
    // Render JSX
    const followers = response.data.followersGet;
    return (
        <React.Fragment>
            {followers.map(function (user) {
                return (
                    <FollowDetail key={user.userId} user={user} />
                );
            })}
        </React.Fragment>
    );
}

//-- Users being followed by user ----------------
export function UserFollows({ userId }) {
    //
    const variables = { userId };
    const response = useQuery(QUERY_followsGet, { variables });
    //
    if(response.loading) {
        return (<Loading />);
    }
    // NOTE: Stretegy for error handling not yet determined
    if(response.error) {
        return `${response.error}`;
    }
    // Render JSX
    const follows = response.data.followsGet;
    return (
        <React.Fragment>
            {follows.map(function (user) {
                return (
                    <FollowDetail key={user.userId} user={user} />
                );
            })}
        </React.Fragment>
    );
}

//-- FollowDetail --------------------------------
function FollowDetail({ user }) {
    const authData = useContext(authenticationContext).userData;
    const [following, setFollowing] = useState(user.followers.following);
    const history = useHistory();
    // Interaction Handlers
    function clickHandler() {
        history.push(urlUserProfile(user.userId));
    }
    function handleFollowClick(followDelta) {
        if(followDelta ===  1){ setFollowing(true );}
        if(followDelta === -1){ setFollowing(false);}
    }
    // JSX Render
    let followButton = '';
    if(authData.userId !== user.userId) {
        followButton = (
            <ButtonFollowToggle
                following={following}
                userId={user.userId}
                onClick={handleFollowClick}
            />
        );
    }
    let followIndicator = '';
    if(user.followers.follows) {
        followIndicator = (
            <span className="userdetail_followind" children="Follows You" />
        )
    }
    return (
        <div className="userdetail" onClick={clickHandler}>
            <Portrait user={user} />
            <div className="userdetail_content">
                <div className="userdetail_splitter">
                    <div className="userdetail_stacker">
                        <UserName user={user} />
                        {followIndicator}
                    </div>
                    {followButton}
                </div>
                <div className="userdetail_description">
                    {user.description}
                </div>
            </div>
        </div>
    );
}
