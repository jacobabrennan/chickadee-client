

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import authenticationContext from '../../authentication/index.js';
import { QUERY_userGet, MUTATION_userUpdate } from '../../server_api/graphql_queries.js';
import Loading from '../../components/loading.js';
import { urlUserProfile } from '../../utilities.js';
import './index.css';

//------------------------------------------------
export default function ViewSettings() {
    // NOTE: Disable submit during mutation
    const portraitDrawn = useRef();
    const userData = useContext(authenticationContext).userData;
    const history = useHistory();
    const [state, setState] = useState({
        nameText: '',
        descriptionText: '',
        portrait: null,
        portraitUrl: null,
    });
    const settingsResponse = useQuery(QUERY_userGet, {
        variables: {userId: userData.userId},
        onCompleted: function (data) {
            setState({
                nameText: data.userGet.name,
                descriptionText: data.userGet.description,
                portrait: null,
                portraitUrl: data.userGet.portraitUrl,
            });
        },
    });
    const [userUpdate] = useMutation(MUTATION_userUpdate, {
        onCompleted: function () {
            // NOTE: check for errors
            history.push(urlUserProfile(userData.userId));
        },
    });
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
        const newState = Object.assign({}, state);
        newState.nameText = eventChange.currentTarget.value;
        setState(newState);
    }
    function handleChangeDescription(eventChange) {
        const newState = Object.assign({}, state);
        newState.descriptionText = eventChange.currentTarget.value;
        setState(newState);
    }
    async function handleSelectPortrait(eventChange) {
        const newState = Object.assign({}, state);
        const fileSelected = eventChange.currentTarget.files.item(0);
        const canvas = portraitDrawn.current;
        newState.portrait = await portraitGetDataUrl(fileSelected, canvas);
        setState(newState);
    }
    //
    if(settingsResponse.loading) {
        return (<Loading />);
    }
    if(settingsResponse.error) {
        return 'Error'
    }
    // Render JSX
    let portraitPreview = '';
    if(!state.portrait && state.portraitUrl) {
        portraitPreview = (
            <img
                src={state.portraitUrl}
                width="128"
                height="128"
                className="profile_editor_portrait"
                alt="Profile Portrait"
            />
        );
    }
    return (
        <form className="profile_editor" onSubmit={handleSubmit}>
            <div className="profile_editor_top">
                <label className="portrait_container">
                    <img
                        className="profile_editor_camera_icon"
                        src="camera_add.svg"
                        alt="Select file for profile portrait"
                    />
                    {portraitPreview}
                    <canvas ref={portraitDrawn} width="128" height="128" style={{
                        display: (state.portrait? 'block' : 'none')
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

//------------------------------------------------
async function portraitGetDataUrl(fileSelected, canvas) {
    const fileBitmap = await createImageBitmap(fileSelected);
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
    return canvas.toDataURL('image/png', 1.0);
}
