import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function useHeader() {
    const userState = useSelector((state) => state.user)
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
