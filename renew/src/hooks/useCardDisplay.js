import { useContext, useState } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer/cardReducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateCardProfileStyle } from '../store/cardsSlice'
import { cardClient } from '../client'

export default function useCardDisplay(card) {
    let data, saveProfileStyle
    const [editPicture, setEditPicture] = useState(false)
    const userState = useSelector(state => state.user)

    if (!card) {
        const { cardState, cardDispatch } = useContext(CardContext)
        data = cardState
        saveProfileStyle = (style) => {
            cardDispatch({
                type: CARD_ACTIONS.UPDATE_PROFILE_STYLE,
                payload: { style },
            })
            setEditPicture(false)
        }
    } else {
        data = card
        const dispatch = useDispatch()
        saveProfileStyle = (style) => {
            dispatch(updateCardProfileStyle({ id: data.id, value: style }))
            cardClient.updateProfileStyle(userState.username, data.id, style)
            setEditPicture(false)
        }
    }

    const handlePictureEdit = () => {
        setEditPicture(true)
    }

    return {
        data,
        saveProfileStyle,
        editPicture,
        handlePictureEdit,
    }
}
