

//==============================================================================

//-- Dependencies --------------------------------
const URL_POST_SUBMIT = '/feed/post';

//------------------------------------------------
export default {
    async postSubmit(content) {
        let requestHeaders = {
            'Content-Type': 'application/json',
        };
        let requestBody = JSON.stringify(content);
        let requestOptions = {
            method: 'post',
            credentials: 'same-origin',
            headers: requestHeaders,
            body: requestBody,
        };
        let response = await fetch(URL_POST_SUBMIT, requestOptions);
        if(!response.ok) { console.log('Not Ok'); return null;}
        return true;
    }
}
