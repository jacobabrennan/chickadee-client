

/*== Url Handling Utilities ====================================================

This module exports functions for generating urls in commonly needed formats.
It exports the following functions:

urlUserProfile(userId): Returns a link to view the profile of the specified
    user.

urlUserFollowing(userId): Returns a link to view the list of all users the
    specified user follows.

urlUserFollowers(userId): Returns a link to view the list of all users that
    follow the specified user.

*/

//-- Dependencies --------------------------------
import { URL_USER_PROFILE } from "./constants";

//-- URL Generators ------------------------------
export function urlUserProfile(userId) {
    return `${URL_USER_PROFILE}/${userId}`;
}
export function urlUserFollowing(userId) {
    return `${URL_USER_PROFILE}/${userId}/follows`;
}
export function urlUserFollowers(userId) {
    return `${URL_USER_PROFILE}/${userId}/followers`;
}
