import { useState, useContext } from 'react'
import { userSignup } from '../api'
import { UserContext } from '../context/UserContext'

export default function useSignup() {
    const { setUser } = useContext(UserContext)
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
            setUser({ username: id, profile, cards, nickname })
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
