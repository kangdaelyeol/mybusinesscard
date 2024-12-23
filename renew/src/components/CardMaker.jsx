import React from 'react'
import useCardMaker from '../hooks/useCardMaker'

import CardEditorForm from './CardEditorForm'
export default function CardMaker() {
    const {
        state,
        changeDescription,
        changeName,
        changeTheme,
        uploadFile,
        saveCard,
        fileLoading,
    } = useCardMaker()

    const handlers = {
        handleNameChange: changeName,
        handleThemeChange: changeTheme,
        handleDescriptionChange: changeDescription,
        handleFileInput: uploadFile,
        handleButtonClick: saveCard,
    }

    return (
        <CardEditorForm
            handlers={handlers}
            fileLoading={fileLoading}
            card={state}
            buttonName={'save'}
        />
    )
}
