

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Composer from '../../components/composer.js';
import Feed from '../../components/feed.js';
import './index.css';

//-- GraphQL Queries -----------------------------
// NOTE: How to remove useless "getFeed" token?
const QUERY_feedGet = gql`query getFeed {
    feedGet {
        posts {
            postId
            userId
            text
            created
        }
    }
}`;

//------------------------------------------------
export default function ViewHome() {
    // Setup state hooks
    // const userData = useContext(AuthenticationContext);
    const {loading, error, data} = useQuery(QUERY_feedGet);
    //
    if(loading) { return 'Loading...';}
    if(error) {
        return `Error! ${error.message}`;
    }
    //
    return (
        <React.Fragment>
            <Composer />
            <Feed posts={data.feedGet.posts} />
        </React.Fragment>
    );
}
