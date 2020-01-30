

//==============================================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect } from 'react';
import * as routing from 'react-router-dom';
import client from '../../server_api/index.js';
import {
    QUERY_userGet,
    MUTATION_userUpdate,
} from '../../server_api/graphql_queries.js';
import './index.css';

//-- Project Constants ---------------------------
const ACTION_CHANGE_NAME = 'change name';
const ACTION_CHANGE_DESCRIPTION = 'change description';
const ACTION_SUBMIT = 'submit';
const ACTION_UPDATE_RESPONSE = 'update';

//-- Initial State -------------------------------
const stateInitial = {
    nameText: '',
    descriptionText: '',
    portrait: null,
}

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_CHANGE_NAME: {
            newState.nameText = action.newText;
            break;
        }
        case ACTION_CHANGE_DESCRIPTION: {
            newState.descriptionText = action.newText;
            break;
        }
        case ACTION_SUBMIT: {
            break;
        }
        case ACTION_UPDATE_RESPONSE: {
            newState.nameText = action.data.name;
            newState.descriptionText = action.data.description;
            break;
        }
        default: {}
    }
    return newState;
}

//------------------------------------------------
export default function ViewSettings(props) {
    //
    const userId = props.userId;
    const [state, dispatch] = useReducer(reducer, stateInitial);
    //
    useEffect(function () {
        const variables = {userId: userId};
        client.graphQL(QUERY_userGet, variables).then(data => {
            console.log(data)
            dispatch({
                type: ACTION_UPDATE_RESPONSE,
                data: data.userGet,
            })
        });
    }, [userId]);
    // Interaction Handlers
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        dispatch({
            type: ACTION_SUBMIT,
        });
        const variables = {
            name: state.nameText,
            description: state.descriptionText,
        };
        client.graphQL(MUTATION_userUpdate, variables).then(data => {
            dispatch({
                type: ACTION_UPDATE_RESPONSE,
                data: data.userUpdate,
            });
        });
    }
    function handleChangeName(eventChange) {
        dispatch({
            type: ACTION_CHANGE_NAME,
            newText: eventChange.currentTarget.value,
        });
    }
    function handleChangeDescription(eventChange) {
        dispatch({
            type: ACTION_CHANGE_DESCRIPTION,
            newText: eventChange.currentTarget.value,
        });
    }
    // Render JSX
    return (
        <form className="profile_editor" onSubmit={handleSubmit}>
            <h1>Settings</h1>
            <label>
                <span>Portrait</span>
                <input type="file" />
            </label>
            <label>
                <span>Display Name</span>
                <input
                    type="text"
                    name="name"
                    value={state.nameText}
                    onChange={handleChangeName}
                />
            </label>
            <label>
                <span>Description</span>
                <textarea
                    name="description"
                    value={state.descriptionText}
                    onChange={handleChangeDescription}
                />
            </label>
            <label>
                <button type="submit" children="Save" />
            </label>
        </form>
    );
}
