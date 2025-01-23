import { authClient } from '../client'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { EVENT_TYPES, PubSubContext } from '../context/PubSubContext'

const useChangePassword = () => {
    const userState = useSelector((state) => state.user)
    const { publish } = useContext(PubSubContext)

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
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            setErrorMessage('')
            setPasswordState((prev) => ({ ...prev, current: e.target.value }))
        },

        handleNewPasswordChange: (e) => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            setErrorMessage('')
            setPasswordState((prev) => ({ ...prev, new: e.target.value }))
        },

        handleConfirmPasswordChange: (e) => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            setErrorMessage('')
            setPasswordState((prev) => ({ ...prev, confirm: e.target.value }))
        },

        handleSaveButtonClick: async () => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
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
