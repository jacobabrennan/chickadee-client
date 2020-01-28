

//== Posts API =================================================================

//-- Dependencies --------------------------------

//-- Project Constants ---------------------------
const URL_FEED_UPDATE = '/data';

//------------------------------------------------
export default {
    async feedUpdate(userId) {
        const query =  `
            query {
                feed(userId: "${userId}") {
                    posts {
                        postId
                        userId
                        text
                        created
                    }
                }
            }
        `;
        const requestBody = JSON.stringify({query: query});
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
        }
        let response = await fetch(URL_FEED_UPDATE, requestOptions);
            // Note: network errors propagated (not caught)
        if(!response.ok) { return null;}
        const dataUpdate = await response.json();
        const responseFeed = dataUpdate.data.feed;
        return responseFeed;
    },
}
