import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { userClient } from '../client'
import { USER_ACTIONS } from '../reducer/userReducer'
import { useDispatch } from 'react-redux'
import { initCards } from '../store/cardsSlice'

export default function GuestOnly({ children }) {
    const { userDispatch, userState } = useContext(UserContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            const storageUsername = localStorage.getItem(
                'USER_NAME_BUSINESS_CARD',
            )

            if (!storageUsername) {
                userDispatch({ type: USER_ACTIONS.LOGOUT })
                return
            }

            if (userState.username === storageUsername) {
                navigate('/')
                return
            }

            const res = await userClient.get(storageUsername)
            const { username, nickname, profile, cards } = res.data

            userDispatch({
                type: USER_ACTIONS.LOGIN,
                payload: { user: { username, nickname, profile } },
            })
            dispatch(initCards({ cards }))
            navigate('/')
        })()
    }, [])

    return children
}
