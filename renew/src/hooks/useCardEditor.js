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

const MAX_PROFILE_SIZE = 3000000

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
        // Form submission canceled because the form is not connected 경고 방지
        e.preventDefault()
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
