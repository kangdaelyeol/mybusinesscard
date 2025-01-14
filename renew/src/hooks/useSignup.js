import { useState, useContext } from 'react'
import { userClient } from '../client'
import { UserContext } from '../context/UserContext'
import { USER_ACTIONS } from '../reducer/userReducer'

export default function useSignup() {
    const { userDispatch } = useContext(UserContext)
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
                console.log(res.value)
                userDispatch({
                    type: USER_ACTIONS.LOGIN,
                    payload: { user: { username, profile, cards, nickname } },
                })
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
