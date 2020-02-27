

/*== Home View =================================================================

This module exports one React component, ViewHome, which renders the website's
"home page". This consists of a post composer followed a feed of posts from all
users the user is currently following. It accepts no props.

*/

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import authenticationContext from '../../authentication/index.js';
import { QUERY_feedGet } from '../../server_api/graphql_queries.js';
import Composer from '../../components/composer/index.js';
import Feed from '../../components/feed/index.js';
import Loading from '../../components/loading/index.js';
import './index.css';

//-- React Component -----------------------------
export default function ViewHome() {
    // Setup state and get data from server
    const userData = useContext(authenticationContext).userData;
    const {loading, error, data} = useQuery(QUERY_feedGet, {variables: {
        userId: userData.userId,
    }});
    // Handle loading
    if(loading) {
        return (<Loading />);
    }
    // NOTE: Stretegy for error handling not yet determined
    if(error) {
        return `Error! ${error.message}`;
    }
    // Render JSX
    return (
        <React.Fragment>
            <Composer user={userData} />
            <Feed data={data.feedGet} />
        </React.Fragment>
    );
}
