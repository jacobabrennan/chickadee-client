

//==============================================================================

//-- Dependencies --------------------------------
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
    MUTATION_followLinkAdd,
    MUTATION_followLinkRemove,
} from '../../server_api/graphql_queries.js';
import './button.css';

//-- Project Constants ---------------------------

//------------------------------------------------
export function ButtonFollowToggle(props) {
    function handleUnfollow() { props.onClick(-1);}
    function handleFollow() { props.onClick(1);}
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

//------------------------------------------------
export function ButtonFollow(props) {
    const [followAdd, response] = useMutation(MUTATION_followLinkAdd);
    useEffect(function () {
        if(!response.data || !response.data.followLinkAdd) { return;}
        props.onClick();
    }, [response.data, props]);
    function handleClick(eventClick) {
        eventClick.stopPropagation();
        if(response.loading) { return;}
        followAdd({variables: {targetId: props.userId}});
    }
    return (
        <button
            className="button"
            disabled={response.loading? true : false}
            onClick={handleClick}
            children="Follow"
        />
    );
}

//------------------------------------------------
export function ButtonUnfollow(props) {
    const [followRemove, response] = useMutation(MUTATION_followLinkRemove);
    useEffect(function () {
        if(!response.data || !response.data.followLinkRemove) { return;}
        props.onClick()
    }, [response.data, props]);
    function handleClick(eventClick) {
        eventClick.stopPropagation();
        if(response.loading) { return;}
        followRemove({variables: {targetId: props.userId}});
    }
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

//------------------------------------------------
export function ButtonProfileEdit() {
    return (
        <Link
            className="button"
            to="/settings"
            children="Edit"
        />
    );
}
