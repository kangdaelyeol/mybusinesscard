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

export default function useCardEditor() {
    const [fileLoading, setFileLoading] = useState(false)
    const state = useSelector((state) => state.cards)

    const updateProfile = async (e, id) => {
        setFileLoading(true)

        const card = state.cards.find((card) => card.id === id)

        const res = await uploadCloudinaryImage(e.target.files[0])

        if (res.status !== 200) {
            setFileLoading(false)
            console.log(res.message)
            return
        }

        if (card.profile.url) {
            deleteCloudinaryImage(card.signature, card.assetId)
        }

        const { url, asset_id, signature, public_id, width, height } = res.data
        dispatch(
            updateCardProfile({
                id,
                value: {
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
