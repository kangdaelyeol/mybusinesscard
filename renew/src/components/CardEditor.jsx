import React from 'react'
import useCardEditor from '../hooks/useCardEditor'
import CardEditorForm from './CardEditorForm'
export default function CardEditor({ card }) {
    const {
        updateName,
        updateDescription,
        updateTheme,
        deleteMyCard,
        updateProfile,
        fileLoading,
    } = useCardEditor()

    const handlers = {
        handleNameChange: (e) => updateName(e, card.id),
        handleThemeChange: (e) => updateTheme(e, card.id),
        handleDescriptionChange: (e) => updateDescription(e, card.id),
        handleFileInput: (e) => updateProfile(e, card.id),
        handleButtonClick: (e) => deleteMyCard(e, card.id),
    }

    return (
        <CardEditorForm
            card={card}
            handlers={handlers}
            fileLoading={fileLoading}
            buttonName={'delete'}
        />
    )
}
