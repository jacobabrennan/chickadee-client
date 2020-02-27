

//== User Activity =============================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_userDataPackage } from '../../server_api/graphql_queries.js';
import Feed from '../../components/feed/index.js';
import UserInfo from '../../components/user_info/index.js';
import Loading from '../../components/loading/index.js';

//-- React Component -----------------------------
export default function UserActivity({ userId }) {
    // Request data from server
    const variables = { userId };
    const response = useQuery(QUERY_userDataPackage, { variables });
    // Handle Loading
    if(response.loading) {
        return (<Loading />);
    }
    // NOTE: Stretegy for error handling not yet determined
    if(response.error) {
        return `${response.error}`;
    }
    // Render JSX
    return (
        <React.Fragment>
            <UserInfo userData={response.data.userGet} />
            <Feed data={response.data.userActivityGet} />
        </React.Fragment>
    );
}
