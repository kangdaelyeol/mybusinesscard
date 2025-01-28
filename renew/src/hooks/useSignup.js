import { useContext, useState } from 'react'
import { userClient } from '../client'
import { useDispatch } from 'react-redux'
import { initCards } from '../store/cardsSlice'
import { loginUser } from '../store/userSlice'
import { LOCALSTORAGE_TOKEN_NAME } from '../constants'
import { ToasterMessageContext } from '../context/ToasterMessageContext'

export default function useSignup() {
    const { setToasterMessageTimeOut } = useContext(ToasterMessageContext)

    const dispatch = useDispatch()

    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [signupInput, setSignupInput] = useState({
        username: '',
        password: '',
        nickname: '',
        confirmPassword: '',
    })

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

                localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, username)

                dispatch(loginUser({ username, profile, nickname }))
                dispatch(initCards({ cards }))
                setToasterMessageTimeOut('Sign up sucessfully!!')
            } else {
                setErrorMessage(res.reason)
                setLoading(false)
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
