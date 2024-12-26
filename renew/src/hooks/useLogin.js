import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { userLogin } from '../api'
import { UserContext } from '../context/UserContext'
export default function useLogin() {
    const { theme } = useContext(ThemeContext)
    const { setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [loginInput, setLoginInput] = useState({ username: '', password: '' })

    const handleUserLogin = async () => {
        if (loading) return
        setLoading(true)

        const res = await userLogin(loginInput.username, loginInput.password)

        if (res.status === 200) {
            setUser((prev) => ({
                ...prev,
                username: res.data.id,
                profile: res.data.profile,
                cards: res.data.cards,
            }))
        }
        setLoading(false)
    }

    const handleUsernameInput = (e) => {
        setLoginInput((prev) => ({ ...prev, username: e.target.value }))
    }

    const handlePasswordInput = (e) => {
        setLoginInput((prev) => ({ ...prev, password: e.target.value }))
    }

    return {
        theme,
        handleUserLogin,
        handleUsernameInput,
        handlePasswordInput,
        loading,
        loginInput,
    }
}
