

/*== Button ====================================================================

This module exports four React components:

ButtonLink:
    - Renders a react-router-dom Link as a styled button.
    - Accepts the following Props:
        to(string): A URL. Same as defined on the Link component.
        children: Same as defined on the Link component.

ButtonFollowToggle:
    - Renders as either ButtonFollow or ButtonUnfollow, determined by the value of
    the 'following' prop. Used wherever a user profile is displayed, to allow
    the local user to follow or unfollow the remote user. Clicking the button
    will fire a GraphQL mutation.
    - Accepts the following props:
        following(boolean): Is the local user current following this user.
        userId(string): The id of the remote user.
        onClick(function): A callback to inform the parent component that the
            user has followed or unfollowed the remote user. It accepts a single
            argument, a number. The number will be 1 for a follow action, and -1
            for an unfollow action.

ButtonFollow:
    - Renders a button with the text "Follow", which when clicked fires a GraphQL
    follow mutation.
    - Accepts the following Props:
        userId(string): The id of the remote user.
        onClick(function): A callback function which will be invoked after
            receiving a reply from the server in response to the follow
            mutation.

ButtonUnfollow:
    - Renders a button with the text "Following", which when clicked fires a
    GraphQL unfollow mutation. When the user selects or hovers over the link, it
    displays the text "Unfollow".
    - Accepts the following Props:
        userId(string): The id of the remote user.
        onClick(function): A callback function which will be invoked after
            receiving a reply from the server in response to the unfollow
            mutation.

*/

//-- Dependencies --------------------------------
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
    MUTATION_followLinkAdd,
    MUTATION_followLinkRemove,
} from '../../server_api/graphql_queries.js';
import './button.css';


//== Components ================================================================

//-- Basic Link Button ---------------------------
export function ButtonLink(props) {
    return (
        <Link
            className="button"
            to={props.to}
            children={props.children}
        />
    );
}

//-- Toggle Follow -------------------------------
export function ButtonFollowToggle(props) {
    // Interaction Handlers
    function handleUnfollow() { props.onClick(-1);}
    function handleFollow() { props.onClick(1);}
    // Render JXS
    if(props.following) {
        return (
            <ButtonUnfollow userId={props.userId} onClick={handleUnfollow} />
        )
    } else{
        return (
            <ButtonFollow userId={props.userId} onClick={handleFollow} />
        )
    }
}

//-- Follow --------------------------------------
export function ButtonFollow(props) {
    // Prepare mutation and response handler
    const [followAdd, response] = useMutation(MUTATION_followLinkAdd);
    useEffect(function () {
        // Invokes onClick only after receiving a server response
        if(!response.data || !response.data.followLinkAdd) { return;}
        props.onClick();
    }, [response.data, props]);
    // Interaction Handlers
    function handleClick(eventClick) {
        eventClick.stopPropagation();
        if(response.loading) { return;}
        followAdd({variables: {targetId: props.userId}});
    }
    // Render JSX
    return (
        <button
            className="button"
            disabled={response.loading? true : false}
            onClick={handleClick}
            children="Follow"
        />
    );
}

//-- Unfollow ------------------------------------
export function ButtonUnfollow(props) {
    // Prepare mutation and response handler
    const [followRemove, response] = useMutation(MUTATION_followLinkRemove);
    useEffect(function () {
        // Invokes onClick only after receiving a server response
        if(!response.data || !response.data.followLinkRemove) { return;}
        props.onClick()
    }, [response.data, props]);
    // Interaction Handlers
    function handleClick(eventClick) {
        eventClick.stopPropagation();
        if(response.loading) { return;}
        followRemove({variables: {targetId: props.userId}});
    }
    // Render JSX
    return (
        <button
            className={`button danger`}
            disabled={response.loading? true : false}
            onClick={handleClick}
        >
            <span className="button_message_normal" children="Following" />
            <span className="button_message_hover" children="Unfollow" />
        </button>
    );
}
