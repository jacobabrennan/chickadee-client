

/*== Feed Components ===========================================================

Exports one component, Feed:

- Represents a list of posts with associated user contexts.

- Accepts on prop, data(object), with the following structure:
    posts(array): An array of post objects (as defined in GraphQL schema).
    userContexts(array): An array of user contexts (as defined in GraphQL
        schema).

*/

//-- Dependencies --------------------------------
import React from 'react';
import Post from '../post/index.js';
import './feed.css';

//-- Main Component ------------------------------
export default function Feed(props) {
    // Associate each user context with a userId, for ease of post association
    const userHash = {};
    props.data.userContexts.forEach(function (userContext) {
        userHash[userContext.userId] = userContext;
    });
    // Render JSX: A list of post components, with associated user contexts.
    return (
        <div className="feed">
            {props.data.posts.map(function (post) {
                return (
                    <Post
                        key={post.postId}
                        post={post}
                        userContext={userHash[post.authorId]}
                    />
                );
            })}
        </div>
    );
}
