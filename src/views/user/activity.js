

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_userDataPackage } from '../../server_api/graphql_queries.js';
import Feed from '../../components/feed/index.js';
import UserInfo from '../../components/user_info/index.js';
import Loading from '../../components/loading/index.js';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function UserActivity(props) {
    //
    const variables = {
        userId: props.userId,
    };
    const response = useQuery(QUERY_userDataPackage, {
        variables: variables,
    });
    //
    if(response.loading) {
        return (<Loading />);
    }
    if(response.error) {
        return `${response.error}`;
    }
    // Render JSX
    const userData = response.data.userGet;
    const feedData = response.data.userActivityGet;
    return (
        <React.Fragment>
            <UserInfo userData={userData} />
            <Feed data={feedData} />
        </React.Fragment>
    );
}
