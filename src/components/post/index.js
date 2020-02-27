

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import {
    URL_POST,
    URL_IMAGE_POSTREPLY,
} from '../../utilities/constants.js';
import Portrait from '../portrait/index.js';
import UserName from '../user_name/index.js';
import './post.css';

//------------------------------------------------
export default function Post(props) {
    // NOTE: need default portraitUrl
    const routerHistory = routing.useHistory();
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
