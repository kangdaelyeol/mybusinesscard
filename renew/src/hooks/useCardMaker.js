import { useContext, useState } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer'
import { uploadCloudinaryImage } from '../api'
import { useDispatch } from 'react-redux'
import { createCard } from '../store/cardsSlice'

export default function useCardMaker() {
    const { state, dispatch } = useContext(CardContext)
    const dispatchRedux = useDispatch()
    const [fileLoading, setFileLoading] = useState(false)
    const changeDescription = (e) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_DESCRIPTION,
            payload: { description: e.target.value },
        })
    }

    const changeName = (e) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_NAME,
            payload: { name: e.target.value },
        })
    }

    const changeTheme = (e) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_THEME,
            payload: { theme: e.target.value },
        })
    }

    const handleFileInput = async (fileRef) => {
        setFileLoading(true)
        const data = await uploadCloudinaryImage(fileRef.current.files[0])
        dispatch({
            type: CARD_ACTIONS.UPDATE_PROFILE,
            payload: { profile: data.url },
        })
        setFileLoading(false)
    }

    const saveCard = () => {
        const cardID = Date.now()
        dispatchRedux(createCard({ card: { ...state, id: cardID } }))
        dispatch({ type: CARD_ACTIONS.CLEAR_CARD })
    }

    return {
        state,
        changeDescription,
        changeName,
        changeTheme,
        handleFileInput,
        saveCard,
        fileLoading,
    }
}
