import { useState, useContext } from 'react'
import { USER_ACTIONS } from '../reducer/userReducer'
import { UserContext } from '../context/UserContext'
export default function useHeader() {
    const { userState, userDispatch } = useContext(UserContext)

    const [profileDetail, setProfileDetail] = useState(false)

    const handleProfileClick = () => {
        if (!userState.username) return
        setProfileDetail((prev) => !prev)
    }

    const handleLogoutClick = () => {
        userDispatch({ type: USER_ACTIONS.LOGOUT })
        setProfileDetail(false)
    }

    return { profileDetail, handleProfileClick, handleLogoutClick, userState }
}
