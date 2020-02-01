

//== Feed Components ===========================================================

//-- Dependencies --------------------------------
import React from 'react';
import Post from './post.js';

//-- Main Component ------------------------------
export default function Feed(props) {
    return (
        <div>
            {props.posts.map(function (post) {
                return (
                    <Post
                        key={post.postId}
                        post={post}
                        userContext={props.userContexts[post.authorId]}
                    />);
            })}
        </div>
    );
}
