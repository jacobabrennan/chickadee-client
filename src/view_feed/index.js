

//==============================================================================

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import * as clientAPI from '../client_api.js';

//------------------------------------------------
export default function ViewFeed() {
    //
    let [posts, setPosts] = useState([]);
    //
    useEffect(function () {
        clientAPI.feedUpdate().then(function (postsUpdate) {
            setPosts([].concat(postsUpdate));
        });
    }, []);
    //
    return (<React.Fragment>
        <button
            children="Logout"
            onClick={function () {
                clientAPI.logout();
            }}
        />
        <br />
        Feed
        <br />
        {posts.map(function (postData) {
            return (<Post key={postData.key} post={postData} />)
        })}
    </React.Fragment>);
}

//-- Post ----------------------------------------
function Post(props) {
    const post = props.post;
    return (
        <div className="post">
            <span className="post_author">{post.authorId}</span>
            <div className="post_body">{post.content}</div>
        </div>
    );
}
