

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState } from 'react';
// import * as routing from 'react-router-dom';
// import * as clientAPI from '../client_api.js';

//------------------------------------------------
export default function ViewPost() {
    const [post] = useState(undefined);
    // Display post
    if(post === undefined) {
        return 'Requesting';
    }
    if(post === null) {
        return 'Post not found';
    }
    return (
        <React.Fragment>
            <h1>{post.author}</h1>
            <p>{post.body}</p>
        </React.Fragment>
    );
}
