

//==============================================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { authenticationContext } from '../../server_api/index_old.js';
import { QUERY_userGet, MUTATION_userUpdate } from '../../server_api/graphql_queries.js';
import './index.css';

//-- Project Constants ---------------------------
const ACTION_CHANGE_NAME = 'change name';
const ACTION_CHANGE_DESCRIPTION = 'change description';
const ACTION_SETTINGS_RESPONSE = 'settings response';

//-- Initial State -------------------------------
const stateInitial = {
    nameText: '',
    descriptionText: '',
    portrait: null,
}

//-- Action Reducer ------------------------------
function reducer(state, action) {
    console.log(action)
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_SETTINGS_RESPONSE: {
            newState.nameText = action.data.name || '';
            newState.descriptionText = action.data.description || '';
            break;
        }
        case ACTION_CHANGE_NAME: {
            newState.nameText = action.newText;
            break;
        }
        case ACTION_CHANGE_DESCRIPTION: {
            newState.descriptionText = action.newText;
            break;
        }
        default: {}
    }
    return newState;
}

//------------------------------------------------
export default function ViewSettings(props) {
    // Setup hooks for state and database
    const userData = useContext(authenticationContext)
    const [state, dispatch] = useReducer(reducer, stateInitial);
    const settingsResponse = useQuery(QUERY_userGet, {variables: {
        userId: userData.userId,
    }});
    const [userUpdate, userUpdateResponse] = useMutation(MUTATION_userUpdate);
    // Reset form on database response
    useEffect(function () {
        if(!settingsResponse.data){ return;}
        dispatch({
            type: ACTION_SETTINGS_RESPONSE,
            data: settingsResponse.data.userGet,
        })
    }, [settingsResponse.data]);
    useEffect(function () {
        if(!userUpdateResponse.data){ return;}
        dispatch({
            type: ACTION_SETTINGS_RESPONSE,
            data: userUpdateResponse.data.userUpdate,
        })
    }, [userUpdateResponse.data]);
    // Interaction Handlers
    function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        userUpdate({variables: {
            name: state.nameText,
            description: state.descriptionText,
        }});
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
    //
    if(settingsResponse.loading) {
        return 'Loading';
    }
    if(settingsResponse.error) {
        return 'Error'
    }
    // Render JSX
    console.log(state.nameText, state.descriptionText)
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
