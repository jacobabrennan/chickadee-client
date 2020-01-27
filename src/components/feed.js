

//== Feed Components ===========================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import Post from './post.js';
import client from '../server_api/index.js';

//-- Project Constants ---------------------------
const ACTION_USERID_SET = 'set userid';
const ACTION_POSTS_UPDATE = 'update posts';

//-- Initial State -------------------------------
const stateInitial = {
    userId: undefined,
    posts: [],
}

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_USERID_SET: {
            newState.userId = action.userId;
            break;
        }
        case ACTION_POSTS_UPDATE: {
            let postsById = {};
            state.posts.concat(action.posts).forEach(post => {
                postsById[post.postId] = post;
            });
            newState.posts = Object.keys(postsById).map(key => postsById[key]);
            break;
        }
        default: {}
    }
    return newState;
}

//-- Main Component ------------------------------
export default function Feed(props) {
    // Setup state hooks
    function stateInitializer(state) {
        const stateInitialWithUser = Object.assign({}, state);
        stateInitialWithUser.userId = props.userId;
        return stateInitialWithUser;
    }
    const [state, dispatch] = useReducer(reducer, stateInitial, stateInitializer);
    // Request posts on receipt of userId
    useEffect(function () {
        client.feed.feedUpdate(state.userId).then(newPosts => {
            dispatch({
                type: ACTION_POSTS_UPDATE,
                posts: newPosts,
            });
        });
    }, [state.userId]);
    // Render JSX
    return (
        <div>
            {state.posts.map(function (postData) {
                return (<Post key={postData.postId} post={postData} />);
            })}
        </div>
    );
}
