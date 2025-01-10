import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    deleteCard,
    updateCardProfile,
} from '../store/cardsSlice'

import { imageClient, cardClient } from '../client'
import { UserContext } from '../context/UserContext'

export default function useCardEditor(card) {
    const [fileLoading, setFileLoading] = useState(false)
    const {
        userState: { username },
    } = useContext(UserContext)

    const dispatch = useDispatch()

    const handlers = {
        handleProfileChange: async (e) => {
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

            const firebaseRes = await cardClient.updateProfile(
                username,
                id,
                newProfile,
            )

            if (firebaseRes.status !== 200) {
                console.log('Error - uploadInFirebase: ', firebaseRes.reason)
                imageClient.deleteInCloudinary(signature, asset_id)
                setFileLoading(false)
                return
            }
            if (card.profile.url) {
                imageClient.deleteInCloudinary(card.signature, card.assetId)
            }

            dispatch(updateCardProfile({ id: card.id, value: newProfile }))
            setFileLoading(false)
        },

        handleNameChange: (e) => {
            cardClient.updateName(username, card.id, e.target.value)
            dispatch(updateCardName({ id: card.id, value: e.target.value }))
        },

        handleDescriptionChange: (e) => {
            cardClient.updateDescription(username, card.id, e.target.value)
            dispatch(
                updateCardDescription({ id: card.id, value: e.target.value }),
            )
        },

        handleThemeChange: (e) => {
            cardClient.updateTheme(username, card.id, e.target.value)
            dispatch(updateCardTheme({ id: card.id, value: e.target.value }))
        },

        handleCardDelete: () => {
            if (fileLoading) return
            cardClient.remove(username, card.id)
            dispatch(deleteCard({ id: card.id }))
        },
    }

    return {
        handlers,
        fileLoading,
    }
}
