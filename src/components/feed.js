

//== Feed Components ===========================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import Post from './post.js';
import client from '../server_api/index.js';
import { QUERY_feedGet } from '../server_api/graphql_queries.js';

//-- Project Constants ---------------------------
const ACTION_POSTS_UPDATE = 'update posts';

//-- Initial State -------------------------------
const stateInitial = {
    posts: [],
}

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_POSTS_UPDATE: {
            // let postsById = {};
            // state.posts.concat(action.posts).forEach(post => {
            //     postsById[post.postId] = post;
            // });
            // console.log('setting posts')
            // newState.posts = Object.keys(postsById).map(key => postsById[key]);
            newState.posts = action.posts
            break;
        }
        default: {}
    }
    return newState;
}

//-- Main Component ------------------------------
export default function Feed(props) {
    // Setup state hooks
    const [state, dispatch] = useReducer(reducer, stateInitial);
    // Request posts on receipt of userId
    useEffect(function () {
        const variables = {userId: props.userId};
        client.graphQL(QUERY_feedGet, variables).then(data => {
            dispatch({
                type: ACTION_POSTS_UPDATE,
                posts: data.feedGet.posts,
            });
        });
    }, [props.userId]);
    // Render JSX
    return (
        <div>
            {state.posts.map(function (postData) {
                return (<Post key={postData.postId} post={postData} />);
            })}
        </div>
    );
}
