import { useContext } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer'

export default function useCardMaker() {
    const { state, dispatch } = useContext(CardContext)

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

    const changeProfile = (value) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_PROFILE,
            payload: { profile: value },
        })
    }

    return {
        state,
        changeDescription,
        changeName,
        changeTheme,
        changeProfile,
    }
}
