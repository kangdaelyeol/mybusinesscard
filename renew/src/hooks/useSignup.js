import { useState, useContext } from 'react'
import { userSignup } from '../api'
import { UserContext } from '../context/UserContext'

export default function useSignup() {
    const { setUser } = useContext(UserContext)
    const [signupInput, setSignupInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false)

    const handleUsernameInput = (e) => {
        setSignupInput((prev) => ({ ...prev, username: e.target.value }))
    }

    const handlePasswordInput = (e) => {
        setSignupInput((prev) => ({ ...prev, password: e.target.value }))
    }

    const handleConfirmPasswordInput = (e) => {
        setSignupInput((prev) => ({ ...prev, confirmPassword: e.target.value }))
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { username, password, confirmPassword } = signupInput
        const res = await userSignup(username, password, confirmPassword)
        if (res.status === 200) {
            const { id, profile, cards } = res.value
            setUser({ username: id, profile, cards })
        } else {
            console.log(res)
        }

        setLoading(false)
    }

    return {
        handleUsernameInput,
        handlePasswordInput,
        handleConfirmPasswordInput,
        handleSignupSubmit,
        loading,
        signupInput
    }
}
