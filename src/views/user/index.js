

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import * as routing from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_userDataPackage } from '../../server_api/graphql_queries.js';
import Feed from '../../components/feed.js';
import UserInfo from '../../components/user_info.js';
import './index.css';

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
    if(response.loading || response.error) {
        return `${response.error}` || 'loading';
    }
    // Render JSX
    const userData = response.data.userGet;
    const postContexts = response.data.userActivityGet.postContexts;
    return (
        <React.Fragment>
            <UserInfo userData={userData} />
            <Feed postContexts={postContexts} />
        </React.Fragment>
    );
}
