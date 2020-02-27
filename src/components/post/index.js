

/*== Post ======================================================================

Exports a single React component, Post. Posts are media objects authored by
individual users. Posts display a body of text, and the author's name and
portrait. In the future, authors will be able to attach other media to posts,
which users can then choose to view. Possible media types include images, links,
audio, and large bodies of text.

Accepts the following props:
    post(object): A post object, as defined in the GraphQL schema.
    userContext(object): A userContext object, as defined in the GraphQL schema.

*/

//-- Dependencies --------------------------------
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    URL_POST,
    URL_IMAGE_POSTREPLY,
} from '../../utilities/constants.js';
import Portrait from '../portrait/index.js';
import UserName from '../user_name/index.js';
import './post.css';

//-- React Component -----------------------------
export default function Post(props) {
    // NOTE: need default portraitUrl
    const routerHistory = useHistory();
    const post = props.post;
    const userContext = props.userContext;
    const linkPost = `${URL_POST}/${post.postId}`;
    function clickHandler() {
        routerHistory.push(linkPost);
    }
    return (
        <div className="post" onClick={clickHandler}>
            <Portrait user={userContext} />
            <div className="post_content">
                <UserName user={userContext} />
                <div className="post_body">
                    {post.text}
                </div>
                <div className="post_actions">
                    <img className="icon" src={URL_IMAGE_POSTREPLY} alt="Reply" />
                    <img className="icon" alt="derp" />
                    <img className="icon" alt="derp" />
                </div>
            </div>
        </div>
    );
}
