

//==============================================================================

//------------------------------------------------
export async function authenticate() {
    //
    let response = await fetch(`/data/updates`);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    return await response.json();
}
export async function register(userName, password) {
    //
    let postHeaders = {
        'Content-Type': 'application/json',
    };
    let postBody = JSON.stringify({
        userName: userName,
        password: password,
    });
    let requestOptions = {
        method: 'post',
        credentials: 'same-origin',
        headers: postHeaders,
        body: postBody,
    };
    //
    let response = await fetch(`/auth/register`, requestOptions);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    // return await response.json();
    return true;
}
export async function login(userName, password) {
    //
    let postHeaders = {
        'Content-Type': 'application/json',
    };
    let postBody = JSON.stringify({
        userName: userName,
        password: password,
    });
    let requestOptions = {
        method: 'post',
        credentials: 'same-origin',
        headers: postHeaders,
        body: postBody,
    };
    //
    let response = await fetch(`/auth/login`, requestOptions);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    // return await response.json();
    return true;
}
export async function logout() {
    //
    let requestOptions = {
        method: 'post',
        credentials: 'same-origin',
    };
    //
    let response = await fetch(`/auth/logout`, requestOptions);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    // return await response.json();
    return true;
}
export async function userGet(userId) {
    //
    let response = await fetch(`/data/user/${userId}`);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    return await response.json();
}