

//== Server API ================================================================

//-- Dependencies --------------------------------
import ApolloClient from 'apollo-boost';

//-- Project Constants ---------------------------
const URL_GRAPHQL = '/data';

//------------------------------------------------
const apolloOptions = {
    uri: URL_GRAPHQL,
};
export default new ApolloClient(apolloOptions);
