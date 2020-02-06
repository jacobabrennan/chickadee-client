

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import './post.css';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';
const URL_POST = '/post';

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
            <img className="post_portrait" src={userContext.portraitUrl} />
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
            </div>
        </div>
    );
}
