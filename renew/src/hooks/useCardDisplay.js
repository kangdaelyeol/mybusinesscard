import { useContext, useState } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer'
import { useDispatch } from 'react-redux'
import { updateCardProfileStyle } from '../store/cardsSlice'

export default function useCardDisplay(card) {
    let data, saveProfileStyle
    const [editPicture, setEditPicture] = useState(false)

    if (!card) {
        const { state, dispatch } = useContext(CardContext)
        data = state
        saveProfileStyle = (style) => {
            dispatch({
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
