

//== New Post Composer =========================================================

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
    const [postCreate, {loading, /*error,*/ data}] = useMutation(MUTATION_postCreate);
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
