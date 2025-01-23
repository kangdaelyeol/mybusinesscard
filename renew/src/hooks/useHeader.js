import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PubSubContext, EVENT_TYPES } from '../context/PubSubContext'
export default function useHeader() {
    const userState = useSelector((state) => state.user)
    const [profileDetail, setProfileDetail] = useState(false)
    const { subscribe, unSubscribe, publish } = useContext(PubSubContext)

    useEffect(() => {
        const hideProfileDetail = () => {
            setProfileDetail(false)
        }

        subscribe(EVENT_TYPES.HIDE_PROFILE_DETAIL, hideProfileDetail)
        return () => {
            unSubscribe(EVENT_TYPES.HIDE_PROFILE_DETAIL, hideProfileDetail)
        }
    }, [])

    const navigate = useNavigate()

    const handleProfileClick = () => {
        if (!userState.username) return
        setProfileDetail((prev) => !prev)
    }

    const handleTitleClick = () => {
        navigate('/')
        publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
    }

    return {
        profileDetail,
        handleProfileClick,
        userState,
        handleTitleClick,
    }
}
