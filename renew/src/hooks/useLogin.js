import { useContext, useState } from 'react'
import { authClient } from '../client'
import { UserContext } from '../context/UserContext'
import { USER_ACTIONS } from '../reducer/userReducer'
import { useDispatch } from 'react-redux'
import { initCards } from '../store/cardsSlice'
import { useNavigate } from 'react-router-dom'

export default function useLogin() {
    const { userDispatch } = useContext(UserContext)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [loginInput, setLoginInput] = useState({
        username: '',
        password: '',
        remember: false,
    })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handlers = {
        handleUserLogin: async (e) => {
            e.preventDefault()
            if (loading) return

            setLoading(true)

            const res = await authClient.signIn(
                loginInput.username,
                loginInput.password,
            )

            if (res.status === 200) {
                const { username, profile, cards = [], nickname } = res.data
                if (loginInput.remember)
                    localStorage.setItem('USER_NAME_BUSINESS_CARD', username)
                userDispatch({
                    type: USER_ACTIONS.LOGIN,
                    payload: { user: { username, profile, nickname } },
                })
                dispatch(initCards({ cards }))

                navigate('/')
            } else if (res.status === 400) {
                setErrorMessage(res.reason)
            }
            setLoading(false)
        },

        handleUsernameInput: (e) => {
            setErrorMessage('')
            setLoginInput((prev) => ({ ...prev, username: e.target.value }))
        },

        handlePasswordInput: (e) => {
            setErrorMessage('')
            setLoginInput((prev) => ({ ...prev, password: e.target.value }))
        },

        handleRememberMeChange: () => {
            setLoginInput((prev) => ({ ...prev, remember: !prev.remember }))
        },
    }

    return {
        handlers,
        loading,
        loginInput,
        errorMessage,
    }
}
