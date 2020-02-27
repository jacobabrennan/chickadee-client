

//== User Info ==================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import authenticationContext from '../../authentication/index.js';
import {
    urlUserFollowing,
    urlUserFollowers,
} from '../../utilities/url_handling.js';
import {
    ButtonFollowToggle,
    ButtonProfileEdit,
} from '../button/index.js';
import Portrait from '../portrait/index.js';
import UserName from '../user_name/index.js';
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
                <Portrait user={props.userData} large />
                <div className="userinfo_follow">
                    {followButton}
                    {followIndicator}
                    <Link
                        className="userinfo_count"
                        to={urlUserFollowing(userId)}
                        children={`${follow.countFollowing} Following`}
                    />
                    <Link
                        className="userinfo_count"
                        to={urlUserFollowers(userId)}
                        children={`${follow.countFollowers} Followers`}
                    />
                </div>
            </div>
            <UserName noLink user={props.userData} />
            <div className="userinfo_description" children={description} />
        </div>
    );
}
