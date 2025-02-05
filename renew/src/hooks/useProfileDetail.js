import { useContext, useEffect, useRef, useState } from 'react'
import { imageClient, userClient } from '../client'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCards } from '../store/cardsSlice'
import {
    logoutUser,
    updateUserProfile,
    updateUserProfileStyle,
} from '../store/userSlice'
import { createUserProfile } from '../factory/userFactory'
import { LOCALSTORAGE_TOKEN_NAME } from '../constants'
import { PubSubContext, EVENT_TYPES } from '../context/PubSubContext'
import { ToasterMessageContext } from '../context/ToasterMessageContext'

export default function useProfileDetail() {
    const { subscribe, unSubscribe, publish } = useContext(PubSubContext)
    const { setToasterMessageTimeOut } = useContext(ToasterMessageContext)

    const userState = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [imageStyling, setImageStyling] = useState(false)
    const [imageOption, setImageOption] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)

    const fileInputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const hideImageStyling = () => {
            setImageStyling(false)
        }
        subscribe(EVENT_TYPES.HIDE_IMAGE_STYLING, hideImageStyling)
        return () => {
            unSubscribe(EVENT_TYPES.HIDE_IMAGE_STYLING, hideImageStyling)
        }
    }, [])

    const saveProfileStyle = async (style) => {
        const res = await userClient.updateProfileStyle(
            userState.username,
            style,
        )
        if (res.status !== 200) {
            console.error('Error - updateUserProfileStyle: ', e)
            setImageStyling(false)
            setImageOption(false)
            return
        }
        setToasterMessageTimeOut('Profile style has changed successfully!!')
        dispatch(updateUserProfileStyle(style))
        setImageStyling(false)
        setImageOption(false)
    }

    const handlers = {
        handleEditPositionClick: () => {
            setImageStyling(true)
        },

        handleEditProfileClick: () => {
            setImageOption((prev) => !prev)
        },

        handleFileInput: async (e) => {
            setFileLoading(true)
            const res = await imageClient.uploadInCloudinary(e.target.files[0])

            if (res.status !== 200) {
                console.error('Error - UploadCloudinaryImage: ', res.reason)
                setFileLoading(false)
                return
            }

            const { url, asset_id, public_id, width, height } = res.data

            const newProfile = createUserProfile({
                url,
                assetId: asset_id,
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
                await imageClient.deleteInCloudinary(
                    newProfile.assetId,
                    newProfile.publicId,
                )
                setFileLoading(false)
                return
            }

            if (userState.profile.url) {
                await imageClient.deleteInCloudinary(
                    userState.profile.assetId,
                    userState.profile.publicId,
                )
            }

            dispatch(updateUserProfile(newProfile))

            setFileLoading(false)
            setImageStyling(true)
        },

        handleNewFileClick: () => {
            fileInputRef.current.click()
        },

        handleManageAccountClick: () => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            navigate('/account')
        },

        handleLogoutClick: () => {
            localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            dispatch(logoutUser())
            dispatch(clearCards())
            setToasterMessageTimeOut('Logged out successfully!!')
            navigate('/login')
        },
    }

    return {
        fileInputRef,
        handlers,
        saveProfileStyle,
        userState,
        imageStyling,
        imageOption,
        fileLoading,
    }
}
