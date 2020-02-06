

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    QUERY_followersGet,
    QUERY_followsGet,
} from '../../server_api/graphql_queries.js';
import Loading from '../../components/loading.js';
import * as routing from 'react-router-dom';
import { authenticationContext } from '../../authentication/index.js';
import { ButtonFollowToggle } from '../../components/button.js';
import { URL_USER_PROFILE } from '../../constants.js';

//------------------------------------------------
export function UserFollowers(props) {
    //
    const variables = {
        userId: props.userId,
    };
    const response = useQuery(QUERY_followersGet, {
        variables: variables,
    });
    //
    if(response.loading) {
        return (<Loading />);
    }
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

//------------------------------------------------
export function UserFollows(props) {
    //
    const variables = {
        userId: props.userId,
    };
    const response = useQuery(QUERY_followsGet, {
        variables: variables,
    });
    //
    if(response.loading) {
        return (<Loading />);
    }
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

//------------------------------------------------
function FollowDetail(props) {
    //
    const user = props.user;
    //
    const authData = useContext(authenticationContext);
    const [following, setFollowing] = useState(user.followers.following);
    const history = routing.useHistory();
    const userUrl = `${URL_USER_PROFILE}/${user.userId}`;
    // Interaction Handlers
    function clickHandler() {
        history.push(userUrl);
    }
    function clickHandlerLink(eventClick) {
        eventClick.stopPropagation();
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
            <img
                className="userdetail_portrait"
                src={user.portraitUrl}
                alt={`Profile portrait for user @${user.userId}`}
            />
            <div className="userdetail_content">
                <div className="userdetail_splitter">
                    <div className="userdetail_stacker">
                        <routing.Link
                            className="userdetail_name"
                            to={`${URL_USER_PROFILE}/${user.userId}`}
                            onClick={clickHandlerLink}
                        >
                            <span
                                className="userdetail_chosen"
                                children={user.name || user.userId}
                            />
                            <span
                                className="userdetail_id"
                                children={user.userId}
                            />
                        </routing.Link>
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
