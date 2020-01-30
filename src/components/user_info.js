

//== User Info ==================================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import * as routing from 'react-router-dom';
import client from '../server_api/index.js';
import {
    QUERY_followersGet,
    MUTATION_followLinkAdd,
    MUTATION_followLinkRemove,
} from '../server_api/graphql_queries.js';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';
const ACTION_FOLLOWERS_UPDATE = 'update followers';

//-- Initial State -------------------------------
const stateInitial = {
    followers: [],
}

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_FOLLOWERS_UPDATE: {
            newState.followers = action.followers.slice();
            break;
        }
        default: {}
    }
    return newState;
}

//-- Main Component ------------------------------
export default function UserInfo(props) {
    // Setup state hooks
    const [state, dispatch] = useReducer(reducer, stateInitial);
    // Request
    useEffect(function () {
        const variables = {userId: props.userId};
        client.graphQL(QUERY_followersGet, variables).then(data => {
            dispatch({
                type: ACTION_FOLLOWERS_UPDATE,
                followers: data.followersGet,
            });
        });
    }, [props.userId]);
    //
    function handleFollow() {
        client.graphQL(MUTATION_followLinkAdd, {targetId: props.userId}).then(data => {
        });
    }
    function handleUnfollow() {
        client.graphQL(MUTATION_followLinkRemove, {targetId: props.userId}).then(data => {
        });
    }
    // Render JSX
    return (
        <div className="userinfo">
            <span className="username">
                <routing.Link to={`${URL_USER_PROFILE}/${props.userId}`}>
                    {props.userId}
                </routing.Link>
            </span>
            <br />
            <button
                children="Follow"
                disabled={false}
                onClick={handleFollow}
            />
            <button
                children="Unfollow"
                disabled={false}
                onClick={handleUnfollow}
            />
            <br />
            Follower Count: {state.followers.length}
        </div>
    );
}
