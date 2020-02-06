

//==============================================================================

//-- Dependencies --------------------------------
import React, { useReducer, useEffect, useContext, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { authenticationContext } from '../../authentication/index.js';
import { QUERY_userGet, MUTATION_userUpdate } from '../../server_api/graphql_queries.js';
import Loading from '../../components/loading.js';
import './index.css';

//-- Project Constants ---------------------------
const ACTION_CHANGE_NAME = 'change name';
const ACTION_CHANGE_DESCRIPTION = 'change description';
const ACTION_SETTINGS_RESPONSE = 'settings response';
const ACTION_FILE_SELECT = 'portrait select';

//-- Initial State -------------------------------
const stateInitial = {
    nameText: '',
    descriptionText: '',
    portrait: null,
    portraitUrl: null,
}

//-- Action Reducer ------------------------------
function reducer(state, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case ACTION_SETTINGS_RESPONSE: {
            newState.nameText = action.data.name || '';
            newState.descriptionText = action.data.description || '';
            newState.portraitUrl = action.data.portraitUrl || null;
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
        case ACTION_FILE_SELECT: {
            newState.portrait = action.dataURL;
            break;
        }
        default: {}
    }
    return newState;
}

//------------------------------------------------
export default function ViewSettings(props) {
    const portraitDrawn = useRef();
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
    async function handleSubmit(eventSubmit) {
        eventSubmit.preventDefault();
        userUpdate({variables: {
            name: state.nameText,
            description: state.descriptionText,
            portrait: state.portrait,
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
    async function handleSelectPortrait(eventChange) {
        const fileSelected = eventChange.currentTarget.files.item(0);
        const fileBitmap = await createImageBitmap(fileSelected);
        const canvas = portraitDrawn.current;
        const context = canvas.getContext('2d');
        //
        const aspectRatioImage = fileBitmap.width / fileBitmap.height;
        let drawWidth = 128;
        let drawHeight = 128;
        if(aspectRatioImage >= 1) {
            drawWidth = drawHeight * aspectRatioImage;
        } else {
            drawHeight = drawWidth / aspectRatioImage;
        }
        //
        context.drawImage(fileBitmap, 0, 0, drawWidth, drawHeight);
        dispatch({
            type: ACTION_FILE_SELECT,
            dataURL: canvas.toDataURL('image/png', 1.0),
        });
    }
    //
    if(settingsResponse.loading) {
        return (<Loading />);
    }
    if(settingsResponse.error) {
        return 'Error'
    }
    // Render JSX
    return (
        <form className="profile_editor" onSubmit={handleSubmit}>
            <div className="profile_editor_top">
                <label className="portrait_container">
                    <img
                        className="profile_editor_camera_icon"
                        src="camera_add.svg"
                        alt="Select file for profile portrait"
                    />
                    {state.portraitUrl? 
                        <img src={state.portraitUrl} width="128" height="128" className="profile_editor_portrait" alt="Profile Portrait" />
                        : ''
                    }
                    <canvas ref={portraitDrawn} width="128" height="128" style={{
                        display: (state.portraitUrl? 'none' : 'block')
                    }}/>
                    <input type="file" onChange={handleSelectPortrait} />
                </label>
                <label>
                    <button className="button" type="submit" children="Save" />
                </label>
            </div>
            <label className="profile_editor_name">
                <span>Display Name</span>
                <input
                    type="text"
                    name="name"
                    value={state.nameText}
                    onChange={handleChangeName}
                />
            </label>
            <label className="profile_editor_description">
                <span>Description</span>
                <textarea
                    name="description"
                    value={state.descriptionText}
                    onChange={handleChangeDescription}
                />
            </label>
        </form>
    );
}
