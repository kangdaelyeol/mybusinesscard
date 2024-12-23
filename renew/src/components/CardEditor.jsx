import React, { useContext, useRef } from 'react'
import useCardEditor from '../hooks/useCardEditor'
import classNames from 'classnames'
import { ThemeContext } from '../context/ThemeContext'
import CardEditorForm from './CardEditorForm'
export default function CardEditor({ card }) {
    const {
        handleNameChange,
        handleDescriptionChange,
        handleThemeChange,
        handleCardDelete,
        handleFileInput,
        fileLoading,
    } = useCardEditor()

    const handlers = {
        handleNameChange: (e) => handleNameChange(e, card.id),
        handleThemeChange: (e) => handleThemeChange(e, card.id),
        handleDescriptionChange: (e) => handleDescriptionChange(e, card.id),
        handleFileInput: (e) => handleFileInput(e, card.id),
        handleButtonClick: (e) => handleCardDelete(e, card.id),
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
