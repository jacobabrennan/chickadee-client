

//== User Info ==================================================================

//-- Dependencies --------------------------------
import React, { useState, useEffect }/*, { useReducer, useEffect }*/ from 'react';
import * as routing from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
    MUTATION_followLinkAdd,
    MUTATION_followLinkRemove,
} from '../server_api/graphql_queries.js';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

//-- Main Component ------------------------------
export default function UserInfo(props) {
    // Setup state hooks
    const [follow, followSet] = useState({
        count: props.userData.followers.count,
        following: props.userData.followers.following,
    });
    // Mutation Hooks
    const [followAdd, followResponseAdd] = useMutation(MUTATION_followLinkAdd);
    const [followRemove, followResponseRemove] = useMutation(MUTATION_followLinkRemove);
    // Mutation effect handlers
    useEffect(function () {
        if(!followResponseAdd.data || !followResponseAdd.data.followLinkAdd) { return;}
        followSet(function (followOld) {
            return {
                count: followOld.count + 1,
                following: true,
            };
        });
    }, [followResponseAdd.data]);
    useEffect(function () {
        if(!followResponseRemove.data || !followResponseRemove.data.followLinkRemove) { return;}
        followSet(function (followOld) {
            return {
                count: followOld.count - 1,
                following: false,
            };
        });
    }, [followResponseRemove.data]);
    // User interaction handlers
    function handleFollow() {
        if(followResponseAdd.loading) { return;}
        followAdd({variables: {targetId: props.userData.userId}});
    }
    function handleUnfollow() {
        if(followResponseRemove.loading) { return;}
        followRemove({variables: {targetId: props.userData.userId}});
    }
    // Render JSX
    const userId = props.userData.userId;
    const name = props.userData.name;
    const description = props.userData.description;
    return (
        <div className="userinfo">
            <span className="username">
                <routing.Link to={`${URL_USER_PROFILE}/${userId}`}>
                    {name || userId} (@{userId})
                </routing.Link>
            </span>
            <div>
                {description}
            </div>
            <br />
            <button
                children={follow.following? 'Unfollow' : 'Follow'}
                disabled={false}
                onClick={follow.following? handleUnfollow : handleFollow}
            />
            <br />
            Follower Count: {follow.count}
            <br />
            {props.userData.followers.follows? 'Follows You' : ''}
        </div>
    );
}
