import { useContext, useRef, useState } from 'react'
import { imageClient, userClient } from '../client'
import { USER_ACTIONS } from '../reducer/userReducer'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCards } from '../store/cardsSlice'

export default function useProfileDetail(hideProfileDetail) {
    const { userState, userDispatch } = useContext(UserContext)
    const [imageStyling, setImageStyling] = useState(false)
    const [imageOption, setImageOption] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)

    const fileInputRef = useRef()

    const navigate = useNavigate()

    const dispatch = useDispatch()

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
        userDispatch({
            type: USER_ACTIONS.UPDATE_PROFILE_STYLE,
            payload: { style },
        })
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

            const { url, asset_id, signature, public_id, width, height } =
                res.data

            const newProfile = {
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

            userDispatch({
                type: USER_ACTIONS.UPDATE_PROFILE,
                payload: { profile: newProfile },
            })

            setFileLoading(false)
            setImageStyling(true)
        },

        handleNewFileClick: () => {
            fileInputRef.current.click()
        },

        handleManageAccountClick: () => {
            hideProfileDetail()
            navigate('/account')
        },

        handleLogoutClick: () => {
            userDispatch({ type: USER_ACTIONS.LOGOUT })
            localStorage.removeItem('USER_NAME_BUSINESS_CARD')
            hideProfileDetail()
            dispatch(clearCards())
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
