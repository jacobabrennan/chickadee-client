

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/index.js';
import Post from '../../components/post/index.js';
import Composer from '../../components/composer/index.js';
import { QUERY_postGet } from '../../server_api/graphql_queries';
import './index.css';

//------------------------------------------------
export default function ViewPost() {
    // NOTE: Handle case where post doesn't exist (redirect via history)
    const postId = useParams().postId;
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
    return (
        <React.Fragment>
            <Post post={post} userContext={user} />
            <Composer postId={post} user={user} />
        </React.Fragment>
    );
}
