

/*== User Name =================================================================

Exports a single React component, UserName, which displays the user's preferred
name followed by their canonical userId. By default, the component acts a link
to the user's profile.

It accepts the following props:
    user(object): A user object, as defined in the GraphQL schema.
    noLink(boolean): Determines if the component is a link to the user's
        profile. Defaults to false.

*/

//-- Dependencies --------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
import { urlUserProfile } from '../../utilities/url_handling.js';
import './user_name.css';

//-- React Component -----------------------------
export default function UserName({user, noLink}) {
    // Prepare visual contents of components.
    // This will be wrapped in either a link or div.
    let children = (
        <React.Fragment>
            <span className="username_name" children={user.name || user.userId} />
            <span className="username_id" children={user.userId} />
        </React.Fragment>
    );
    // Wrap contents in div, if not a link
    if(noLink) {
        return (<div className="username" children={children} />);
    }
    // Wrap contents in react-browser-router Link
    return (
        <Link
            className="username"
            to={urlUserProfile(user.userId)}
            onClick={eventClick => eventClick.stopPropagation()}
            children={children}
        />
    );
}
