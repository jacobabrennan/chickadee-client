

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';

//-- Project Constants ---------------------------
const URL_USER_PROFILE = '/user';

//------------------------------------------------
export default function Post(props) {
    const post = props.post;
    const authorLink = `${URL_USER_PROFILE}/${post.userId}`
    return (
        <div className="post">
            <Link to={authorLink}>
                <span className="post_author">
                    {post.userId}
                </span>
            </Link>
            <div className="post_body">
                {post.text}
            </div>
        </div>
    );
}
