

//== New Post Composer =========================================================

//-- Dependencies --------------------------------
import React, { useReducer } from 'react';
import client from '../server_api/index.js';
import { MUTATION_postCreate } from '../server_api/graphql_queries.js';
import './composer.css';

//-- Project Constants ---------------------------
const ACTION_SUBMIT = 'submit';
const ACTION_RESET = 'reset';
const ACTION_CHANGE_TEXT = 'text';

//-- Initial State -------------------------------
const stateInitial = {
    submitting: false,
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
        // Handle user submitting a new post
        case ACTION_SUBMIT: {
            newState.submitting = true;
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
    // User Interaction Handlers
    function handleChangeText(eventChange) {
        dispatch({
            type: ACTION_CHANGE_TEXT,
            bodyText: eventChange.currentTarget.value,
        });
    }
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        dispatch({type: ACTION_SUBMIT});
        //
        const variables = {text: state.bodyText};
        client.graphQL(MUTATION_postCreate, variables).then(data => {
            // remember to strip query name from result data
            dispatch({type: ACTION_RESET});
        });
    }
    // JSX Rendering
    return (
        <form className="composer" onSubmit={handleSubmit}>
            <fieldset disabled={state.submitting}>
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
