

//== Feed Components ===========================================================

//-- Dependencies --------------------------------
import React from 'react';
import Post from './post.js';

//-- Main Component ------------------------------
export default function Feed(props) {
    return (
        <div>
            {props.postContexts.map(function (postContext) {
                return (<Post key={postContext.post.postId} post={postContext.post} />);
            })}
        </div>
    );
}
