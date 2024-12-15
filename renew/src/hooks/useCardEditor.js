import { useDispatch } from 'react-redux'
import {
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    deleteCard,
    updateCardProfile,
} from '../store/cardsSlice'

export default function useCardEditor() {
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

    const changeProfile = (url, id) => {
        dispatch(updateCardProfile({ id, value: url }))
    }

    return {
        handleNameChange,
        handleDescriptionChange,
        handleThemeChange,
        handleCardDelete,
        changeProfile,
    }
}
