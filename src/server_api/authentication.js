

//== Authentication API ========================================================

//-- User Id (am I logged in?) -------------------
export async function getId() {
    //
    let response = await fetch(`/auth/userid`);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    const userData = await response.json();
    if(userData.error) {
        alert(userData.error);
        return null;
    }
    return userData.userId;
}

//-- Registration --------------------------------
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
    const userData = await response.json();
    //
    if(userData.error) {
        alert(userData.error);
        return null;
    }
    //
    console.log(userData)
    return userData.userId;
}

//-- Log In --------------------------------------
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
    const userData = await response.json();
    if(userData.error) {
        alert(userData.error);
        return null;
    }
    return userData.userId;
}

//-- Log Out -------------------------------------
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
