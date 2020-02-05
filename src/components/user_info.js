

//== User Info ==================================================================

//-- Dependencies --------------------------------
import React, { useState, useEffect, useContext }/*, { useReducer, useEffect }*/ from 'react';
import * as routing from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
    MUTATION_followLinkAdd,
    MUTATION_followLinkRemove,
} from '../server_api/graphql_queries.js';
import { authenticationContext } from '../server_api/index_old.js';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

//-- Main Component ------------------------------
export default function UserInfo(props) {
    // NOTE: Need default portraitUrl
    const authData = useContext(authenticationContext);
    // Setup state hooks
    const [follow, followSet] = useState({
        countFollowers: props.userData.followers.countFollowers,
        countFollowing: props.userData.followers.countFollowing,
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
                countFollowers: followOld.countFollowers + 1,
                countFollowing: followOld.countFollowing,
                following: true,
            };
        });
    }, [followResponseAdd.data]);
    useEffect(function () {
        if(!followResponseRemove.data || !followResponseRemove.data.followLinkRemove) { return;}
        followSet(function (followOld) {
            return {
                countFollowers: followOld.countFollowers - 1,
                countFollowing: followOld.countFollowing,
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
    const portraitUrl = props.userData.portraitUrl;
    let editButton = '';
    if(authData.userId === userId) {
        editButton = (
            <React.Fragment>
                <routing.Link
                    to="/settings"
                    children="Edit"
                />
            </React.Fragment>
        );
    }
    return (
        <div className="userinfo">
            {editButton}
            <br />
            <img src={portraitUrl} alt={`Portrait of user ${userId}`} />
            <br />
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
            <routing.Link to={`${URL_USER_PROFILE}/${userId}/followers`}>Follower Count: {follow.countFollowers}</routing.Link>
            <br />
            <routing.Link to={`${URL_USER_PROFILE}/${userId}/follows`}>Following Count: {follow.countFollowing}</routing.Link>
            <br />
            {props.userData.followers.follows? 'Follows You' : ''}
        </div>
    );
}
