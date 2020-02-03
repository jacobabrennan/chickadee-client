

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_userDataPackage } from '../../server_api/graphql_queries.js';
import Feed from '../../components/feed.js';
import UserInfo from '../../components/user_info.js';
import './index.css';
import Loading from '../../components/loading.js';

//-- Project Constants ---------------------------

//------------------------------------------------
export default function ViewUser() {
    //
    const variables = {
        userId: routing.useParams().userId,
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
