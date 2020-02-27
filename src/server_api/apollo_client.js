

//== Server API ================================================================

//-- Dependencies --------------------------------
import ApolloClient from 'apollo-boost';
import { URL_GRAPHQL } from '../utilities/constants.js';

//------------------------------------------------
const apolloOptions = {
    uri: URL_GRAPHQL,
};
export default new ApolloClient(apolloOptions);
