import { useState, useContext } from 'react'
import { userSignup } from '../api'
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

    const handleUsernameInput = (e) => {
        setErrorMessage('')
        setSignupInput((prev) => ({ ...prev, username: e.target.value }))
    }

    const handlePasswordInput = (e) => {
        setErrorMessage('')
        setSignupInput((prev) => ({ ...prev, password: e.target.value }))
    }

    const handleConfirmPasswordInput = (e) => {
        setErrorMessage('')
        setSignupInput((prev) => ({ ...prev, confirmPassword: e.target.value }))
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { username, password, confirmPassword } = signupInput
        const res = await userSignup(
            username,
            nickname,
            password,
            confirmPassword,
        )
        if (res.status === 200) {
            const { id, profile, cards, nickname } = res.value
            userDispatch({
                type: USER_ACTIONS.LOGIN,
                payload: { user: { username: id, profile, cards, nickname } },
            })
        } else {
            setErrorMessage(res.reason)
        }

        setLoading(false)
    }

    const handleNicknameInput = (e) => {
        setErrorMessage('')
        setSignupInput((prev) => ({ ...prev, nickname: e.target.nickname }))
    }

    return {
        handleUsernameInput,
        handlePasswordInput,
        handleConfirmPasswordInput,
        handleSignupSubmit,
        handleNicknameInput,
        loading,
        signupInput,
        errorMessage,
    }
}
