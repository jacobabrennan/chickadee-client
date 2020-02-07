

//== User Info ==================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext } from 'react';
import * as routing from 'react-router-dom';
import authenticationContext from '../authentication/index.js';
import {
    ButtonFollowToggle,
    ButtonProfileEdit,
} from './button.js';
import { URL_USER_PROFILE } from '../constants.js';
import './user_info.css';

//-- Main Component ------------------------------
export default function UserInfo(props) {
    // NOTE: Need default portraitUrl
    const authData = useContext(authenticationContext).userData;
    // Setup state hooks
    const [follow, followSet] = useState({
        countFollowers: props.userData.followers.countFollowers,
        countFollowing: props.userData.followers.countFollowing,
        following: props.userData.followers.following,
    });
    // Interaction Handlers
    function handleChange(followersDelta) {
        followSet(function (followOld) {
            let following = followOld.following;
            if(followersDelta ===  1) { following = true;}
            if(followersDelta === -1) { following = false;}
            return {
                countFollowers: followOld.countFollowers + followersDelta,
                countFollowing: followOld.countFollowing,
                following: following,
            };
        });
    }
    // Render JSX
    const userId = props.userData.userId;
    const name = props.userData.name;
    const description = props.userData.description;
    const portraitUrl = props.userData.portraitUrl;
    let followButton = '';
    if(authData.userId === userId) {
        followButton = (<ButtonProfileEdit />);
    }
    else {
        followButton = (
            <ButtonFollowToggle
                following={follow.following}
                userId={userId}
                onClick={handleChange}
            />
        );
    }
    let followIndicator = '';
    if(props.userData.followers.follows) {
        followIndicator = (
            <span className="userinfo_follow_indicator" children="Follows You" />
        );
    }
    return (
        <div className="userinfo">
            <div className="userinfo_glance">
                <img
                    className="userinfo_portrait"
                    src={portraitUrl}
                    alt={`Portrait of user @${userId}`}
                />
                <div className="userinfo_follow">
                    {followButton}
                    {followIndicator}
                    <routing.Link
                        className="userinfo_count"
                        to={`${URL_USER_PROFILE}/${userId}/follows`}
                        children={`${follow.countFollowing} Following`}
                    />
                    <routing.Link
                        className="userinfo_count"
                        to={`${URL_USER_PROFILE}/${userId}/followers`}
                        children={`${follow.countFollowers} Followers`}
                    />
                </div>
            </div>
            <div
                className="userinfo_name"
                to={`${URL_USER_PROFILE}/${userId}`}
            >
                <span className="userinfo_chosen" children={name || userId} />
                <span className="userinfo_id" children={userId} />
            </div>
            <div className="userinfo_description" children={description} />
        </div>
    );
}
