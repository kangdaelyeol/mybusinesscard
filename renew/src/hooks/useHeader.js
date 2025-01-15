import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
export default function useHeader() {
    const { userState } = useContext(UserContext)
    const [profileDetail, setProfileDetail] = useState(false)

    const navigate = useNavigate()
    
    const hideProfileDetail = () => {
        setProfileDetail(false)
    }

    const handleProfileClick = () => {
        if (!userState.username) return
        setProfileDetail((prev) => !prev)
    }

    const handleTitleClick = () => {
        navigate('/')
    }

    return {
        profileDetail,
        handleProfileClick,
        userState,
        hideProfileDetail,
        handleTitleClick,
    }
}
