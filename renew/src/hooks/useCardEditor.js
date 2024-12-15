import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    deleteCard,
    updateCardProfile,
} from '../store/cardsSlice'

import { uploadCloudinaryImage } from '../api'

export default function useCardEditor() {
    const [fileLoading, setFileLoading] = useState(false)

    const handleFileInput = async (id, fileRef) => {
        setFileLoading(true)
        const data = await uploadCloudinaryImage(fileRef.current.files[0])
        dispatch(updateCardProfile({ id, value: data.url }))
        setFileLoading(false)
    }

    const dispatch = useDispatch()

    const handleNameChange = (e, id) => {
        dispatch(updateCardName({ id, value: e.target.value }))
    }

    const handleDescriptionChange = (e, id) => {
        dispatch(updateCardDescription({ id, value: e.target.value }))
    }

    const handleThemeChange = (e, id) => {
        dispatch(updateCardTheme({ id, value: e.target.value }))
    }

    const handleCardDelete = (e, id) => {
        // Form submission canceled because the form is not connected 경고 방지
        e.preventDefault()
        dispatch(deleteCard({ id }))
    }

    return {
        handleNameChange,
        handleDescriptionChange,
        handleThemeChange,
        handleCardDelete,
        handleFileInput,
        fileLoading,
    }
}
