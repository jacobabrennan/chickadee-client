

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as routing from 'react-router-dom';
import Loading from '../../components/loading';
import { QUERY_postGet } from '../../server_api/graphql_queries';
import Post from '../../components/post.js';
import './index.css';

//-- Project Constants ---------------------------
// const URL_USER_PROFILE = '/user';

//------------------------------------------------
export default function ViewPost() {
    // NOTE: Handle case where post doesn't exist (redirect via history)
    const postId = routing.useParams().postId;
    const postResponse = useQuery(QUERY_postGet, {variables: {
        postId: postId,
    }});
    //
    if(postResponse.loading) {
        return (<Loading />);
    }
    if(postResponse.error) {
        return `Error: ${postResponse.error}`;
    }
    //
    // function clickHandlerLink(eventClick) {
    //     eventClick.stopPropagation();
    // }
    // Display post
    const post = postResponse.data.postGet.posts[0];
    const user = postResponse.data.postGet.userContexts[0];
    // const linkAuthor = `${URL_USER_PROFILE}/${post.authorId}`;
    // const linkPost = `${URL_POST}/${post.postId}`;
    return (
        <React.Fragment>
            <Post post={post} userContext={user} />
        </React.Fragment>
    );
}

/*

            <img src={user.portraitUrl} alt={`Portrait of user ${user.userId}`} />
            <routing.Link to={linkAuthor} onClick={clickHandlerLink}>{
                `${user.name} (@${user.userId})`
            }</routing.Link>
            <p>{post.text}</p>
            */
