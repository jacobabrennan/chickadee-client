

//== Posts API =================================================================

//-- Dependencies --------------------------------

//-- Project Constants ---------------------------
const URL_FEED_UPDATE = '/feed';

//------------------------------------------------
export default {
    async feedUpdate() {
        let response = await fetch(URL_FEED_UPDATE);
            // Note: network errors propagated (not caught)
        if(!response.ok) { return null;}
        const dataUpdate = await response.json();
        const responsePosts = dataUpdate.posts;
        return responsePosts;
    },
}
