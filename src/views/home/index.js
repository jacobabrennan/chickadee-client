

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import Composer from '../../components/composer.js';
import Feed from '../../components/feed.js';
import './index.css';

//------------------------------------------------
export default function ViewHome(props) {
    return (
        <React.Fragment>
            <Composer />
            <Feed userId={props.userId} />
        </React.Fragment>
    );
}
