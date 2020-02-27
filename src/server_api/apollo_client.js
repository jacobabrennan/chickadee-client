

/*== Server API ================================================================

This modules configures & exports an Apollo client to be used by ApolloProvider.
Together, they allow for easy use of GraphQL.

*/

//-- Dependencies --------------------------------
import ApolloClient from 'apollo-boost';
import { URL_GRAPHQL } from '../utilities/constants.js';

//------------------------------------------------
const apolloOptions = {
    uri: URL_GRAPHQL,
};
export default new ApolloClient(apolloOptions);
