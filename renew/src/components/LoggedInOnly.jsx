import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userClient } from '../client'
import { useDispatch, useSelector } from 'react-redux'
import { initCards } from '../store/cardsSlice'
import { loginUser } from '../store/userSlice'
export default function LoggedInOnly({ children }) {
    const userState = useSelector((state) => state.user)

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

            dispatch(loginUser({ username, profile, nickname }))
            dispatch(initCards({ cards }))
        })()
    }, [])

    return children
}
