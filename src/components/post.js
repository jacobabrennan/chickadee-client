

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

//------------------------------------------------
export default function Post(props) {
    // NOTE: need default portraitUrl
    const post = props.post;
    const userContext = props.userContext;
    const authorLink = `${URL_USER_PROFILE}/${post.authorId}`
    return (
        <div className="post">
            <img className="post_portrait" src={userContext.portraitUrl} />
            <Link to={authorLink}>
                <span className="post_author">
                {userContext.name || userContext.userId} (@{userContext.userId})
                </span>
            </Link>
            <div className="post_body">
                {post.text}
            </div>
        </div>
    );
}
