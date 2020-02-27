

/*== User Info ==================================================================

Exports a single React component, UserInfo. This component is the main content a
user sees when visiting another user's profile page. It displays the user's
name, bio, portrait, a button to follow/unfollow the user, and a count of the
user's followers and the number of users they are following.

It accepts the following props:
    userData(object): A user object, as defined in the GraphQL schema.

*/

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
    ButtonLink,
} from '../button/index.js';
import Portrait from '../portrait/index.js';
import UserName from '../user_name/index.js';
import './user_info.css';

//-- Main Component ------------------------------
export default function UserInfo({ userData }) {
    // NOTE: Need default portraitUrl
    const authData = useContext(authenticationContext).userData;
    // Setup state. The counts are initialize through props, but can be mutated.
    const [follow, followSet] = useState({
        countFollowers: userData.followers.countFollowers,
        countFollowing: userData.followers.countFollowing,
        following: userData.followers.following,
    });
    // Handle Follow/Unfollow actions
    function handleChange(followersDelta) {
        followSet(function (followOld) {
            // Determine following status (does local user follow remote user)
            let following = followOld.following;
            if(followersDelta ===  1) { following = true;}
            if(followersDelta === -1) { following = false;}
            // Calculate new followers count, and update state
            return {
                countFollowers: followOld.countFollowers + followersDelta,
                countFollowing: followOld.countFollowing,
                following: following,
            };
        });
    }
    // Prep Edit Profile button when viewing own profile
    let followButton = '';
    if(authData.userId === userData.userId) {
        followButton = (<ButtonLink to="/settings" children="Edit" />);
    }
    // Prep Button for following other users
    else {
        followButton = (
            <ButtonFollowToggle
                following={follow.following}
                userId={userData.userId}
                onClick={handleChange}
            />
        );
    }
    // Prep follower indicator (displays if remote user follows local user)
    let followIndicator = '';
    if(userData.followers.follows) {
        followIndicator = (
            <span
                className="userinfo_follow_indicator"
                children="Follows You"
            />
        );
    }
    // Render JSX: shows name, portrait, follow info, and description
    return (
        <div className="userinfo">
            <div className="userinfo_glance">
                <Portrait user={userData} large />
                <div className="userinfo_follow">
                    {followButton}
                    {followIndicator}
                    <Link
                        className="userinfo_count"
                        to={urlUserFollowing(userData.userId)}
                        children={`${follow.countFollowing} Following`}
                    />
                    <Link
                        className="userinfo_count"
                        to={urlUserFollowers(userData.userId)}
                        children={`${follow.countFollowers} Followers`}
                    />
                </div>
            </div>
            <UserName noLink user={userData} />
            <div
                className="userinfo_description"
                children={userData.description}
            />
        </div>
    );
}
