import { useContext, useState } from 'react'
import { userLogin } from '../api'
import { UserContext } from '../context/UserContext'
import { USER_ACTIONS } from '../reducer/userReducer'
export default function useLogin() {
    const { userDispatch } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [loginInput, setLoginInput] = useState({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('')

    const handleUserLogin = async (e) => {
        e.preventDefault()
        if (loading) return

        setLoading(true)

        const res = await userLogin(loginInput.username, loginInput.password)

        if (res.status === 200) {
            const { id, profile, cards, nickname } = res.data
            userDispatch({
                type: USER_ACTIONS.LOGIN,
                payload: { user: { id, profile, cards, nickname } },
            })
        } else if (res.status === 400) {
            setErrorMessage(res.reason)
        }
        setLoading(false)
    }

    const handleUsernameInput = (e) => {
        setErrorMessage('')
        setLoginInput((prev) => ({ ...prev, username: e.target.value }))
    }

    const handlePasswordInput = (e) => {
        setErrorMessage('')
        setLoginInput((prev) => ({ ...prev, password: e.target.value }))
    }

    return {
        handleUserLogin,
        handleUsernameInput,
        handlePasswordInput,
        loading,
        loginInput,
        errorMessage,
    }
}
