import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    deleteCard,
    updateCardProfile,
} from '../store/cardsSlice'

import { imageClient, cardClient } from '../client'
import { createCardProfile } from '../factory/cardFactory'
import { PubSubContext, EVENT_TYPES } from '../context/PubSubContext'

export default function useCardEditor(card) {
    const { publish } = useContext(PubSubContext)
    const [fileLoading, setFileLoading] = useState(false)
    const userState = useSelector((state) => state.user)

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

            const newProfile = createCardProfile({
                url,
                assetId: asset_id,
                signature,
                publicId: public_id,
                style: {
                    width,
                    height,
                },
            })

            const firebaseRes = await cardClient.updateProfile(
                userState.username,
                card.id,
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
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            cardClient.updateName(userState.username, card.id, e.target.value)
            dispatch(updateCardName({ id: card.id, value: e.target.value }))
        },

        handleDescriptionChange: (e) => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            cardClient.updateDescription(
                userState.username,
                card.id,
                e.target.value,
            )
            dispatch(
                updateCardDescription({ id: card.id, value: e.target.value }),
            )
        },

        handleThemeChange: (e) => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            cardClient.updateTheme(userState.username, card.id, e.target.value)
            dispatch(updateCardTheme({ id: card.id, value: e.target.value }))
        },

        handleCardDelete: () => {
            publish(EVENT_TYPES.HIDE_PROFILE_DETAIL)
            if (fileLoading) return
            cardClient.remove(userState.username, card.id)
            dispatch(deleteCard({ id: card.id }))
        },
    }

    return {
        handlers,
        fileLoading,
    }
}
