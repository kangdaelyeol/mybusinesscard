import { authClient } from '../client'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const useChangePassword = () => {
    const userState = useSelector((state) => state.user)

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState()
    const [passwordState, setPasswordState] = useState({
        current: '',
        new: '',
        confirm: '',
    })

    const [saveLoading, setSaveLoading] = useState(false)

    const handlers = {
        handleCurrentPasswordChange: (e) => {
            setErrorMessage('')
            setPasswordState((prev) => ({ ...prev, current: e.target.value }))
        },

        handleNewPasswordChange: (e) => {
            setErrorMessage('')
            setPasswordState((prev) => ({ ...prev, new: e.target.value }))
        },

        handleConfirmPasswordChange: (e) => {
            setErrorMessage('')
            setPasswordState((prev) => ({ ...prev, confirm: e.target.value }))
        },

        handleSaveButtonClick: async () => {
            setSaveLoading(true)

            const res = await authClient.changePassword(
                userState.username,
                passwordState.current,
                passwordState.new,
                passwordState.confirm,
            )

            if (res.status !== 200) {
                setErrorMessage(res.reason)
                setSaveLoading(false)
                return
            }

            navigate('/')
            setSaveLoading(false)
        },

        handleAccountSettingsClick: () => {
            navigate('/account')
        },
    }

    return { handlers, saveLoading, errorMessage, passwordState }
}

export default useChangePassword
