

/*== Loading ===================================================================

Exports a simple React component, Loading, for use whenever the UI cannot be
displayed because data is loading. It renders as a small animated "throbber".
It does not user any props.

*/

//-- Dependencies --------------------------------
import React from 'react';
import './loading.css';

//-- Component & Export --------------------------
export default function Loading() {
    // Note: &nbsp; is a special HTML entity meaning "non-breaking space"
    return (
        <div className="loading">
            <div className="loading-spinner">
                &nbsp;
            </div>
        </div>
    );
}
