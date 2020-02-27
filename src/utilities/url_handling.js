

//==============================================================================

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
