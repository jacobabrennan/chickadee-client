

//== Authentication API ========================================================

//-- Dependencies --------------------------------
import {
    URL_AUTH_LOGIN,
    URL_AUTH_LOGOUT,
    URL_AUTH_REGISTER,
} from "../utilities/constants";


//== API Functions =============================================================

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
        response = await fetch(URL_AUTH_REGISTER, requestOptions);
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
    let response = await fetch(URL_AUTH_LOGIN, requestOptions);
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
    let response = await fetch(URL_AUTH_LOGOUT, requestOptions);
        // Note: network errors propagated (not caught)
    //
    if(!response.ok) { return null;}
    //
    // return await response.json();
    return true;
}
