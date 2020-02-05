

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    QUERY_followersGet,
    QUERY_followsGet,
} from '../../server_api/graphql_queries.js';
import Loading from '../../components/loading.js';
import * as routing from 'react-router-dom';

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
    const user = props.user;
    return (
        <div>
            <img src={user.portraitUrl} />
            <routing.Link to={`${URL_USER_PROFILE}/${user.userId}`}>
                {user.name} (@{user.userId})
            </routing.Link>
            <div>
                {user.description}
            </div>
            <div>
                {user.followers.following? 'You Follow' : ''}
                {user.followers.follows? 'Follows You' : ''}
            </div>
        </div>
    );
}