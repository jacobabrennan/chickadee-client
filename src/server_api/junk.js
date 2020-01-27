
//-- To be refactored ----------------------------
const URL_USER = '/data/user';
export async function userGet(userId) {
    //
    const urlUserSpecific = `${URL_USER}/${userId}`;
    let response = await fetch(urlUserSpecific);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    return await response.json();
}