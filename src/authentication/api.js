

/*== Authentication API ========================================================

This module exports three functions for sending http requests to the API server.
NOTE: that errors are NOT handled currently, as the UI design hasn't matured to
a point where a strategy has been determined for informing the user of errors.
The exported functions are as follows:

async register: Attempts to register a new username with the server. Returns the
    new user's userId on success, and null otherwise. It accepts the following
    arguments:
        userName(string): The requested userId.
        password(string): A password to authenticate the user.
        email(string): A email to use for account validation and recovery;
            currently not implemented.

async login: Attempts to login the user with the server. Returns the user's
    userId on success, and null otherwise. It accepts the following arguments:
        userName(string): The requested userId.
        password(string): A password to authenticate the user.

async logout: Attempt to logout the user with the server. Returns true on
    success, and null otherwise. It accepts no arguments.

*/

//-- Dependencies --------------------------------
import {
    URL_AUTH_LOGIN,
    URL_AUTH_LOGOUT,
    URL_AUTH_REGISTER,
} from "../utilities/constants";


//== API Functions =============================================================

//-- Registration --------------------------------
export async function register(userName, password, email) {
    // Prepare API http request
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
    // Attempt to register with API server
    let response;
    try{
        response = await fetch(URL_AUTH_REGISTER, requestOptions);
    } catch(error){ console.log(error); return null;}
    if(!response.ok) { console.log('Not Ok'); return null;}
    // Get user data from response
    const userData = await response.json();
    if(userData.error) {
        alert(userData.error);
        return null;
    }
    // Return userId
    return userData.userId;
}

//-- Log In --------------------------------------
export async function login(userName, password) {
    // Prepare API http request
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
    // Attempt to login with server
    let response = await fetch(URL_AUTH_LOGIN, requestOptions);
        // Note: network errors propagated (not caught)
    // Get user data from response
    if(!response.ok) { return null;}
    const userData = await response.json();
    if(userData.error) {
        alert(userData.error);
        return null;
    }
    // Return userId
    return userData.userId;
}

//-- Log Out -------------------------------------
export async function logout() {
    // Prepare API http request
    let requestOptions = {
        method: 'post',
        credentials: 'same-origin',
    };
    // Attempt to logout with server
    let response = await fetch(URL_AUTH_LOGOUT, requestOptions);
        // Note: network errors propagated (not caught)
    // Return result
    if(!response.ok) { return null;}
    return true;
}
