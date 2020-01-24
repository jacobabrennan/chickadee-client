

//==============================================================================

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as routing from 'react-router-dom';
import * as clientAPI from '../client_api.js';

//------------------------------------------------
export default function ViewPost() {
    const [post, setPost] = useState(undefined);
    // Retrieve post id from url
    const match = routing.useRouteMatch();
    const postId = match.params.id;
    // Request post from server
    // useEffect(function () {
    //     API.getPost(postId).then(
    //         function (result) { return setPost(result);}
    //     );
    // }, [postId]);
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
