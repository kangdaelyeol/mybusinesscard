import { useState } from 'react'
import { userClient } from '../client'
import { useDispatch } from 'react-redux'
import { initCards } from '../store/cardsSlice'
import { loginUser } from '../store/userSlice'

export default function useSignup() {
    const dispatch = useDispatch()

    const [signupInput, setSignupInput] = useState({
        username: '',
        password: '',
        nickname: '',
        confirmPassword: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const [loading, setLoading] = useState(false)

    const handlers = {
        handleUsernameChange: (e) => {
            setErrorMessage('')
            setSignupInput((prev) => ({ ...prev, username: e.target.value }))
        },

        handlePasswordChange: (e) => {
            setErrorMessage('')
            setSignupInput((prev) => ({ ...prev, password: e.target.value }))
        },

        handleConfirmPasswordChange: (e) => {
            setErrorMessage('')
            setSignupInput((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
            }))
        },

        handleNicknameChange: (e) => {
            setErrorMessage('')
            setSignupInput((prev) => ({ ...prev, nickname: e.target.value }))
        },

        handleSignupSubmit: async (e) => {
            e.preventDefault()
            setLoading(true)
            const { username, password, confirmPassword, nickname } =
                signupInput

            const res = await userClient.create(
                username,
                nickname,
                password,
                confirmPassword,
            )

            if (res.status === 200) {
                const { username, profile, cards, nickname } = res.value

                localStorage.setItem('USER_NAME_BUSINESS_CARD', username)

                dispatch(loginUser({ username, profile, nickname }))
                dispatch(initCards({ cards }))
            } else {
                setErrorMessage(res.reason)
            }

            setLoading(false)
        },
    }

    return {
        handlers,
        loading,
        signupInput,
        errorMessage,
    }
}
