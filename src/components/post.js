

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import {
    URL_USER_PROFILE,
    URL_POST,
    URL_IMAGE_POSTREPLY,
} from '../constants.js'
import './post.css';

//------------------------------------------------
export default function Post(props) {
    // NOTE: need default portraitUrl
    const routerHistory = routing.useHistory();
    const post = props.post;
    const userContext = props.userContext;
    const linkAuthor = `${URL_USER_PROFILE}/${post.authorId}`;
    const linkPost = `${URL_POST}/${post.postId}`;
    function clickHandler() {
        routerHistory.push(linkPost);
    }
    function clickHandlerLink(eventClick) {
        eventClick.stopPropagation();
    }
    return (
        <div className="post" onClick={clickHandler}>
            <img
                className="post_portrait"
                src={userContext.portraitUrl}
                alt={`Portrait of user @${userContext.userId}`}
            />
            <div className="post_content">
                <routing.Link
                    className="post_author"
                    to={linkAuthor}
                    onClick={clickHandlerLink}
                >
                    <span
                        className="post_author_name"
                        children={userContext.name || userContext.userId}
                    />
                    <span
                        className="post_author_id"
                        children={userContext.userId}
                    />
                </routing.Link>
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
