

/*== New Post Composer =========================================================

This module exports one component, the Composer. The component displays a post
composition area where the user is able to write and submit a post. In the
future, the user will also be able to attach other media, such as images, links,
audio, and larger bodies of text.

Accepts the following props:
    user(object): A user object representing the local user (as defined in
        GraphQL schema).

*/

//-- Dependencies --------------------------------
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_postCreate } from '../../server_api/graphql_queries.js';
import './composer.css';
import Portrait from '../portrait/index.js';

//-- React Component -----------------------------
export default function Composer(props) {
    // State Management
    const [state, setState] = useState({bodyText: ''});
    // Prepare post creation GraphQL mutation
    const [postCreate, {loading, /*error,*/ data}] = useMutation(MUTATION_postCreate);
    // Clear the composer after a successful submission to the server
    useEffect(function () {
        setState({bodyText: ''});
    }, [data])
    // User Interaction Handlers
    function handleChangeText(eventChange) {
        setState({bodyText: eventChange.currentTarget.value});
    }
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        const variables = {text: state.bodyText};
        postCreate({variables: variables});
    }
    // JSX Rendering
    return (
        <form className="composer" onSubmit={handleSubmit}>
            <Portrait user={props.user} />
            <fieldset disabled={loading}>
                <textarea
                    className="composer_input"
                    name="textentry"
                    placeholder="Chickadee-dee-dee-dee-dee-dee..."
                    value={state.bodyText}
                    onChange={handleChangeText}
                />
                <button
                    className="button"
                    type="submit"
                    children="Submit"
                />
            </fieldset>
        </form>
    )
}
