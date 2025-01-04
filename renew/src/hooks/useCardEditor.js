import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    deleteCard,
    updateCardProfile,
} from '../store/cardsSlice'

import { deleteCloudinaryImage, uploadCloudinaryImage } from '../api'
import { MAX_PROFILE_SIZE } from '../constants'

export default function useCardEditor() {
    const [fileLoading, setFileLoading] = useState(false)
    const state = useSelector((state) => state.cards)

    const updateProfile = async (e, id) => {
        setFileLoading(true)

        if (
            e.target.files[0]?.size > MAX_PROFILE_SIZE ||
            !e.target.files[0].type.startsWith('image')
        ) {
            setFileLoading(false)
            return
        }

        const card = state.cards.find((card) => card.id === id)
        if (card.profile) deleteCloudinaryImage(card.signature, card.assetId)

        const data = await uploadCloudinaryImage(e.target.files[0])
        dispatch(
            updateCardProfile({
                id,
                value: {
                    url: data.url,
                    assetId: data.asset_id,
                    signature: data.signature,
                    publicId: data.public_id,
                    style: {
                        scale: 1,
                        transX: 0,
                        transY: 0,
                        rounded: 50,
                        width: data.width,
                        height: data.height,
                    },
                },
            }),
        )
        setFileLoading(false)
    }

    const dispatch = useDispatch()

    const updateName = (e, id) => {
        dispatch(updateCardName({ id, value: e.target.value }))
    }

    const updateDescription = (e, id) => {
        dispatch(updateCardDescription({ id, value: e.target.value }))
    }

    const updateTheme = (e, id) => {
        dispatch(updateCardTheme({ id, value: e.target.value }))
    }

    const deleteMyCard = (e, id) => {
        if (fileLoading) return
        dispatch(deleteCard({ id }))
    }

    return {
        updateName,
        updateDescription,
        updateTheme,
        deleteMyCard,
        updateProfile,
        fileLoading,
    }
}
