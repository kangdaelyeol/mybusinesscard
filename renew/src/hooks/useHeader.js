import { useState, useContext } from 'react'
import { USER_ACTIONS } from '../reducer/userReducer'
import { UserContext } from '../context/UserContext'
import { useDispatch } from 'react-redux'
import { clearCards } from '../store/cardsSlice'
import { useNavigate } from 'react-router-dom'
export default function useHeader() {
    const { userState, userDispatch } = useContext(UserContext)
    const [profileDetail, setProfileDetail] = useState(false)
    const dispatch = useDispatch()
    const navegate = useNavigate()

    const handleProfileClick = () => {
        if (!userState.username) return
        setProfileDetail((prev) => !prev)
    }

    const handleLogoutClick = () => {
        userDispatch({ type: USER_ACTIONS.LOGOUT })
        localStorage.removeItem('USER_NAME_BUSINESS_CARD')
        setProfileDetail(false)
        dispatch(clearCards())
        navegate('/login')
    }

    return { profileDetail, handleProfileClick, handleLogoutClick, userState }
}
