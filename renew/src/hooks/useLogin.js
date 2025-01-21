import { useState } from 'react'
import { authClient } from '../client'
import { useDispatch } from 'react-redux'
import { initCards } from '../store/cardsSlice'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../store/userSlice'
import { LOCALSTORAGE_TOKEN_NAME } from '../constants'

export default function useLogin() {
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
                    localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, username)
                dispatch(loginUser({ username, profile, nickname }))
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
