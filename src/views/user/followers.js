

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
import { authenticationContext } from '../../server_api/index_old.js';
import { ButtonFollowToggle } from '../../components/button.js';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

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
    // Interaction Handlers
    function clickHandler() {
    }
    function clickHandlerLink() {
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
            <img className="userdetail_portrait" src={user.portraitUrl} />
            <div className="userdetail_content">
                {followButton}
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
                <div className="userdetail_description">
                    {user.description}
                </div>
            </div>
        </div>
    );
}

        // <div className="post" onClick={clickHandler}>
        //     <img className="post_portrait" src={userContext.portraitUrl} />
        //     <div className="post_content">
        //         <routing.Link
        //             className="post_author"
        //             to={linkAuthor}
        //             onClick={clickHandlerLink}
        //         >
        //             <span
        //                 className="post_author_name"
        //                 children={userContext.name || userContext.userId}
        //             />
        //             <span
        //                 className="post_author_id"
        //                 children={userContext.userId}
        //             />
        //         </routing.Link>
        //         <pre className="post_body">
        //             {post.text}
        //         </pre>
        //     </div>
        // </div>
