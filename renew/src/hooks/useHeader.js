import { useState, useContext } from 'react'
import { USER_ACTIONS } from '../reducer/userReducer'
import { UserContext } from '../context/UserContext'
import { useDispatch } from 'react-redux'
import { clearCards } from '../store/cardsSlice'
export default function useHeader() {
    const { userState, userDispatch } = useContext(UserContext)

    const dispatch = useDispatch()

    const [profileDetail, setProfileDetail] = useState(false)

    const handleProfileClick = () => {
        if (!userState.username) return
        setProfileDetail((prev) => !prev)
    }

    const handleLogoutClick = () => {
        userDispatch({ type: USER_ACTIONS.LOGOUT })
        setProfileDetail(false)
        dispatch(clearCards())
    }

    return { profileDetail, handleProfileClick, handleLogoutClick, userState }
}
