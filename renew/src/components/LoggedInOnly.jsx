import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { userClient } from '../client'
import { USER_ACTIONS } from '../reducer/userReducer'
import { useDispatch } from 'react-redux'
import { initCards } from '../store/cardsSlice'
export default function LoggedInOnly({ children }) {
    const { userState, userDispatch } = useContext(UserContext)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        ;(async () => {
            if (userState?.username) return

            const storageUsername = localStorage.getItem(
                'USER_NAME_BUSINESS_CARD',
            )

            if (!storageUsername) {
                navigate('/login', { replace: true })
                return
            }

            const res = await userClient.get(storageUsername)

            const { username, profile, nickname, cards } = res.data

            userDispatch({
                type: USER_ACTIONS.LOGIN,
                payload: { user: { username, profile, nickname } },
            })
            dispatch(initCards({ cards }))
        })()
    }, [])

    return children
}
