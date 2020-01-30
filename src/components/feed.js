

//== Feed Components ===========================================================

//-- Dependencies --------------------------------
import React from 'react';
import Post from './post.js';

//-- Main Component ------------------------------
export default function Feed(props) {
    return (
        <div>
            {props.posts.map(function (postData) {
                return (<Post key={postData.postId} post={postData} />);
            })}
        </div>
    );
}
