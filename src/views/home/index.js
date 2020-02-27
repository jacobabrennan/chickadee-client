

//==============================================================================

//-- Dependencies --------------------------------
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import authenticationContext from '../../authentication/index.js';
import { QUERY_feedGet } from '../../server_api/graphql_queries.js';
import Composer from '../../components/composer/index.js';
import Feed from '../../components/feed/index.js';
import Loading from '../../components/loading/index.js';
import './index.css';

//------------------------------------------------
export default function ViewHome() {
    // Setup state hooks
    const userData = useContext(authenticationContext).userData;
    const {loading, error, data} = useQuery(QUERY_feedGet, {variables: {
        userId: userData.userId,
    }});
    //
    if(loading) {
        return (<Loading />);
    }
    if(error) {
        return `Error! ${error.message}`;
    }
    //
    return (
        <React.Fragment>
            <Composer user={userData} />
            <Feed data={data.feedGet} />
        </React.Fragment>
    );
}
