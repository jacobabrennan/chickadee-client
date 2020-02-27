

/*== Post View =================================================================

This module exports one React component, ViewPost, which renders a detailed view
of a single post along with other posts made in reply. It accept no props.

NOTE: This view is currently unfinished, as replies haven't been implemented.

*/

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Loading from '../../components/loading/index.js';
import Post from '../../components/post/index.js';
import Composer from '../../components/composer/index.js';
import { QUERY_postGet } from '../../server_api/graphql_queries';
import './index.css';

//-- React Component ------------------------------
export default function ViewPost() {
    const postId = useParams().postId;
    const postResponse = useQuery(QUERY_postGet, {variables: {
        postId: postId,
    }});
    // Handle loading
    if(postResponse.loading) {
        return (<Loading />);
    }
    // NOTE: Stretegy for error handling not yet determined
    if(postResponse.error) {
        return `Error: ${postResponse.error}`;
    }
    // NOTE: Handle case where post doesn't exist (redirect via histor
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
