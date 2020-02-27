

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import { URL_IMAGE_PORTRAIT_DEFAULT } from '../../constants.js';
import './portrait.css';

//------------------------------------------------
export default function Portrait({user, large}) {
    return (
        <img
            className={`portrait ${large? 'large' : ''}`}
            src={user.portraitUrl || URL_IMAGE_PORTRAIT_DEFAULT}
            alt={`Portrait of user @${user.userId}`}
        />
    );
}
