

/*== Portrait ==================================================================

Exports a single React component, Portrait, which renders an image of a user.
Accepts the following props:
    user(object): A user object, as defined in the GraphQL schema.
    large(boolean)[optional]: Determines at which of two standards sizes the
        image will be displayed. Defaults to "false" (small image).

*/

//-- Dependencies --------------------------------
import React from 'react';
import { URL_IMAGE_PORTRAIT_DEFAULT } from '../../utilities/constants.js';
import './portrait.css';

//-- React Component -------------------------------
export default function Portrait({user, large}) {
    return (
        <img
            className={`portrait ${large? 'large' : ''}`}
            src={user.portraitUrl || URL_IMAGE_PORTRAIT_DEFAULT}
            alt={`Portrait of user @${user.userId}`}
        />
    );
}
