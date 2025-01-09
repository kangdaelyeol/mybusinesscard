import { useContext, useRef, useState } from 'react'
import {
    deleteCloudinaryImage,
    setUserProfile,
    setUserProfileStyle,
    uploadCloudinaryImage,
} from '../api'
import { USER_ACTIONS } from '../reducer/userReducer'
import { UserContext } from '../context/UserContext'

export default function useProfileDetail() {
    const { userState, userDispatch } = useContext(UserContext)
    const [avatarSizing, setAvatarSizing] = useState(false)
    const [avatarOption, setAvatarOption] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)

    const fileInputRef = useRef()

    const saveProfileStyle = async (style) => {
        const res = await setUserProfileStyle(userState.username, style)
        if (res.status !== 200) {
            console.log('Error - setUserProfileStyle: ', e)
            setAvatarSizing(false)
            setAvatarOption(false)
            return
        }
        userDispatch({
            type: USER_ACTIONS.UPDATE_PROFILE_STYLE,
            payload: { style },
        })
        setAvatarSizing(false)
        setAvatarOption(false)
    }

    const handleEditPositionClick = () => {
        setAvatarSizing(true)
    }

    const handleEditProfileClick = () => {
        setAvatarOption((prev) => !prev)
    }

    const handleFileInput = async (e) => {
        setFileLoading(true)
        const res = await uploadCloudinaryImage(e.target.files[0])

        if (res.status !== 200) {
            console.log(res.reason)
            setFileLoading(false)
            return
        }

        const { url, asset_id, signature, public_id, width, height } = res.data

        const profile = {
            url,
            assetId: asset_id,
            signature,
            publicId: public_id,
            style: {
                scale: 1,
                transX: 0,
                transY: 0,
                rounded: 50,
                width,
                height,
            },
        }

        const setProfileRes = await setUserProfile(userState.username, profile)

        if (setProfileRes.status !== 200) {
            console.log('Error - setUserProfile: ', setProfileRes.reason)
            deleteCloudinaryImage(profile.signature, profile.assetId)
            setFileLoading(false)
            return
        }

        userDispatch({
            type: USER_ACTIONS.UPDATE_PROFILE,
            payload: { profile },
        })

        setFileLoading(false)
        setAvatarSizing(true)
    }

    const handleNewFileClick = () => {
        fileInputRef.current.click()
    }
    return {
        fileInputRef,
        handleNewFileClick,
        saveProfileStyle,
        handleEditPositionClick,
        handleEditProfileClick,
        handleFileInput,
        userState,
        avatarSizing,
        avatarOption,
        fileLoading,
    }
}
