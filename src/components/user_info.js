

//== User Info ==================================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import * as routing from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    QUERY_followersGet,
    MUTATION_followLinkAdd,
    MUTATION_followLinkRemove,
} from '../server_api/graphql_queries.js';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';
const ACTION_FOLLOWERS_UPDATE = 'update followers';
const ACTION_FOLLOWERS_ADD = 'add';
const ACTION_FOLLOWERS_REMOVE = 'remove';

//-- Initial State -------------------------------
const stateInitial = {
    followers: [],
};

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_FOLLOWERS_UPDATE: {
            newState.followers = action.followers.slice();
            break;
        }
        case ACTION_FOLLOWERS_ADD: {
            let followerIndex = newState.followers.indexOf(action.followerId);
            if(followerIndex !== -1) { break;}
            newState.followers.push(action.followerId);
            break;
        }
        case ACTION_FOLLOWERS_REMOVE: {
            let followerIndex = newState.followers.indexOf(action.followerId);
            if(followerIndex === -1) { break;}
            newState.followers.splice(followerIndex, 1);
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
    const queryVariables = {userId: props.userId};
    const queryOptions = {variables: queryVariables};
    const followResponseGet = useQuery(QUERY_followersGet, queryOptions);
    const [followAdd, followResponseAdd] = useMutation(MUTATION_followLinkAdd);
    const [followRemove, followResponseRemove] = useMutation(MUTATION_followLinkRemove);
    // Request
    useEffect(function () {
        if(!followResponseGet.data) { return;}
        dispatch({
            type: ACTION_FOLLOWERS_UPDATE,
            followers: followResponseGet.data.followersGet,
        });
    }, [followResponseGet.data]);
    useEffect(function () {
        if(!followResponseAdd.data || !followResponseAdd.data.followLinkAdd) { return;}
        dispatch({type: ACTION_FOLLOWERS_ADD, followerId: 'asdf'});
    }, [followResponseAdd.data])
    useEffect(function () {
        if(!followResponseRemove.data || !followResponseRemove.data.followLinkRemove) { return;}
        dispatch({type: ACTION_FOLLOWERS_REMOVE, followerId: 'asdf'})
    }, [followResponseRemove.data])
    //
    function handleFollow() {
        followAdd({variables: {targetId: props.userId}});
    }
    function handleUnfollow() {
        followRemove({variables: {targetId: props.userId}});
    }
    //
    if(followResponseGet.loading) { return 'Loading...';}
    if(followResponseGet.error) {
        return `Error! ${followResponseGet.error.message}`;
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
