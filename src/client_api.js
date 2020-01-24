

//== Authentication ============================================================

//-- User Id (am I logged in?) -------------------
export async function userId() {
    //
    let response = await fetch(`/auth/userid`);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    const responseData = await response.json();
    if(responseData.error) {
        alert(responseData.error);
        return null;
    }
    return responseData.userId;
}

//------------------------------------------------
export async function register(userName, password, email) {
    //
    let postHeaders = {
        'Content-Type': 'application/json',
    };
    let postBody = JSON.stringify({
        userName: userName,
        password: password,
        email: email,
    });
    let requestOptions = {
        method: 'post',
        credentials: 'same-origin',
        headers: postHeaders,
        body: postBody,
    };
    //
    let response;
    try{
        response = await fetch(`/auth/register`, requestOptions);
        // Note: network errors propagated (not caught)
    //
    } catch(error){ console.log(error); return;}
    if(!response.ok) { console.log('Not Ok');return null;}
    //
    const responseData = await response.json();
    //
    if(response.error) {
        alert(response.error);
        return null;
    }
    //
    return responseData.userId;
}

//------------------------------------------------
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
    const responseData = await response.json();
    if(responseData.error) {
        alert(responseData.error);
        return null;
    }
    return responseData.userId;
}

//------------------------------------------------
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


//==============================================================================

export async function userGet(userId) {
    //
    let response = await fetch(`/data/user/${userId}`);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    return await response.json();
}
export async function feedUpdate() {
    let response = await fetch(`/data/feed`);
        // Note: network errors propagated (not caught)
    if(!response.ok) { return null;}
    return await response.json();
}
