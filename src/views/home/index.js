

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { authenticationContext } from '../../server_api/authentication.js';
import { QUERY_feedGet } from '../../server_api/graphql_queries.js';
import Composer from '../../components/composer.js';
import Feed from '../../components/feed.js';
import './index.css';

//------------------------------------------------
export default function ViewHome(props) {
    // Setup state hooks
    const userData = useContext(authenticationContext);
    const {loading, error, data} = useQuery(QUERY_feedGet, {variables: {
        userId: userData.userId,
    }});
    //
    if(loading) { return 'Loading...';}
    if(error) {
        return `Error! ${error.message}`;
    }
    //
    return (
        <React.Fragment>
            <Composer />
            <Feed postContexts={data.feedGet.postContexts} />
        </React.Fragment>
    );
}
