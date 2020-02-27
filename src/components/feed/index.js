

//== Feed Components ===========================================================

//-- Dependencies --------------------------------
import React from 'react';
import Post from '../post/index.js';
import './feed.css';

//-- Main Component ------------------------------
export default function Feed(props) {
    const userHash = {};
    props.data.userContexts.forEach(function (userContext) {
        userHash[userContext.userId] = userContext;
    });
    return (
        <div className="feed">
            {props.data.posts.map(function (post) {
                return (
                    <Post
                        key={post.postId}
                        post={post}
                        userContext={userHash[post.authorId]}
                    />
                );
            })}
        </div>
    );
}
