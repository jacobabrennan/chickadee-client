

//== New Post Composer =========================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_postCreate } from '../server_api/graphql_queries.js';
import './composer.css';

//-- Project Constants ---------------------------
const ACTION_RESET = 'reset';
const ACTION_CHANGE_TEXT = 'text';

//-- Initial State -------------------------------
const stateInitial = {
    bodyText: '',
};

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        // Handle user typing letters into composer textarea
        case ACTION_CHANGE_TEXT: {
            newState.bodyText = action.bodyText;
            break;
        }
        // Reset composer once new post successfully submitted
        case ACTION_RESET: {
            newState = Object.assign({}, stateInitial);
            break;
        }
        // Default: Needed because React whines
        default: {}
    }
    return newState;
}

//-- React Component -----------------------------
export default function Composer() {
    // State Management
    const [state, dispatch] = useReducer(reducer, stateInitial);
    const [postCreate, {loading, /*error,*/ data}] = useMutation(MUTATION_postCreate);
    useEffect(function () {
        dispatch({type: ACTION_RESET});
    }, [data])
    // User Interaction Handlers
    function handleChangeText(eventChange) {
        dispatch({
            type: ACTION_CHANGE_TEXT,
            bodyText: eventChange.currentTarget.value,
        });
    }
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        const variables = {text: state.bodyText};
        postCreate({variables: variables});
    }
    // JSX Rendering
    return (
        <form className="composer" onSubmit={handleSubmit}>
            <fieldset disabled={loading}>
                <textarea
                    className="composer_input"
                    name="textentry"
                    placeholder="Chickadee-dee-dee-dee-dee-dee..."
                    value={state.bodyText}
                    onChange={handleChangeText}
                />
                <button
                    type="submit"
                    children="Submit"
                />
            </fieldset>
        </form>
    )
}
