

//== Server API ================================================================

//-- Dependencies --------------------------------
export * from './authentication.js';

//-- Project Constants ---------------------------
const URL_GRAPHQL = '/data';

//-- Project Constants ---------------------------
export default {
    async graphQL(queryTemplate, variables) {
        //
        const graphQLQuery = {
            query: queryTemplate,
            variables: variables,
        };
        //
        const requestOptions = {
            method: "POST",
            credentials: 'same-origin',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(graphQLQuery),
        };
        let response = await fetch(URL_GRAPHQL, requestOptions);
            // Note: network errors propagated (not caught)
        //
        if(!response.ok) {
            let jerp = await response.json();
            return null;
        }
        const dataUpdate = await response.json();
        return dataUpdate.data;
    },
}
