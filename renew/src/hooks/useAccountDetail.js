import { useRef, useState } from 'react'
import { imageClient, userClient } from '../client'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateUserNickname,
    updateUserProfile,
    updateUserProfileStyle,
} from '../store/userSlice'
import { createUserProfile } from '../factory/userFactory'

const useAccountDetail = () => {
    const userState = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const fileInputRef = useRef()
    const [fileLoading, setFileLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [profileOption, setProfileOption] = useState(false)
    const [profileSizing, setProfileSizing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [nickname, setNickname] = useState(userState.nickname)

    const navigate = useNavigate()

    const saveProfileStyle = async (style) => {
        const res = await userClient.updateProfileStyle(
            userState.username,
            style,
        )
        if (res.status !== 200) {
            console.error('Error - updateUserProfileStyle: ', e)
            setProfileSizing(false)
            setProfileOption(false)
            return
        }
        dispatch(updateUserProfileStyle(style))
        setProfileSizing(false)
        setProfileOption(false)
    }

    const handlers = {
        handleNicknameChange: (e) => {
            setErrorMessage('')
            setNickname(e.target.value)
        },

        handleEditProfileClick: () => {
            setProfileOption((prev) => !prev)
        },

        handleEditPositionClick: () => {
            setProfileSizing(true)
        },

        handleNewFileClick: () => {
            fileInputRef.current.click()
        },

        handleFileInput: async (e) => {
            setFileLoading(true)

            const cloudinaryRes = await imageClient.uploadInCloudinary(
                e.target.files[0],
            )

            if (cloudinaryRes.status !== 200) {
                setFileLoading(false)
                console.log(
                    'Error - uploadInCloudinary: ',
                    cloudinaryRes.message,
                )
                return
            }

            const { url, asset_id, signature, public_id, width, height } =
                cloudinaryRes.data

            const newProfile = createUserProfile({
                url,
                assetId: asset_id,
                signature,
                publicId: public_id,
                style: {
                    width,
                    height,
                },
            })

            const firebaseRes = await userClient.updateProfile(
                userState.username,
                newProfile,
            )

            if (firebaseRes.status !== 200) {
                console.error('Error - uploadInFirebase: ', firebaseRes.reason)
                imageClient.deleteInCloudinary(
                    newProfile.signature,
                    newProfile.assetId,
                )
                setFileLoading(false)
                return
            }

            if (userState.profile.url) {
                imageClient.deleteInCloudinary(
                    userState.profile.signature,
                    userState.profile.assetId,
                )
            }

            dispatch(updateUserProfile(newProfile))
            setFileLoading(false)
            setProfileSizing(true)
        },

        handleSaveButtonClick: async () => {
            setSaveLoading(true)

            const res = await userClient.updateNickname(
                userState.username,
                nickname,
            )

            if (res.status !== 200) {
                console.error('Error - userClient-updateNickname:', res.reason)
                setErrorMessage(res.reason)
                setSaveLoading(false)
                return
            }

            setSaveLoading(false)
            dispatch(updateUserNickname(nickname))
            navigate('/')
        },

        handleChangePasswordClick: () => {
            navigate('/change-password')
        },
    }

    return {
        fileLoading,
        profileOption,
        profileSizing,
        nickname,
        handlers,
        saveProfileStyle,
        fileInputRef,
        userState,
        saveLoading,
        errorMessage,
    }
}

export default useAccountDetail
