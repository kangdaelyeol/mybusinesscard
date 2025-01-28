import { useContext, useEffect, useRef, useState } from 'react'
import { imageClient, userClient } from '../client'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateUserNickname,
    updateUserProfile,
    updateUserProfileStyle,
} from '../store/userSlice'
import { createUserProfile } from '../factory/userFactory'
import { EVENT_TYPES, PubSubContext } from '../context/PubSubContext'

const useAccountDetail = () => {
    const { publish, subscribe, unSubscribe } = useContext(PubSubContext)
    const userState = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const fileInputRef = useRef()
    const [fileLoading, setFileLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [profileOption, setProfileOption] = useState(false)
    const [profileStyling, setProfileStyling] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [nickname, setNickname] = useState(userState.nickname)

    const navigate = useNavigate()

    useEffect(() => {
        const hideProfileStyling = () => {
            setProfileStyling(false)
        }

        subscribe(EVENT_TYPES.HIDE_IMAGE_STYLING, hideProfileStyling)

        return () => {
            unSubscribe(EVENT_TYPES.HIDE_IMAGE_STYLING, hideProfileStyling)
        }
    }, [])

    const saveProfileStyle = async (style) => {
        publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
        const res = await userClient.updateProfileStyle(
            userState.username,
            style,
        )
        if (res.status !== 200) {
            console.error('Error - updateUserProfileStyle: ', e)
            setProfileStyling(false)
            setProfileOption(false)
            return
        }
        dispatch(updateUserProfileStyle(style))
        setProfileStyling(false)
        setProfileOption(false)
    }

    const handlers = {
        handleNicknameChange: (e) => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            setErrorMessage('')
            setNickname(e.target.value)
        },

        handleEditProfileClick: () => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            setProfileOption((prev) => !prev)
        },

        handleEditPositionClick: () => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            setProfileStyling(true)
        },

        handleNewFileClick: () => {
            fileInputRef.current.click()
        },

        handleFileInput: async (e) => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
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
            setProfileStyling(true)
        },

        handleSaveButtonClick: async () => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
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
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            navigate('/change-password')
        },
    }

    return {
        fileLoading,
        profileOption,
        profileStyling,
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
