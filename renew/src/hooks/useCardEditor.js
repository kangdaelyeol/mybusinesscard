import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    deleteCard,
    updateCardProfile,
} from '../store/cardsSlice'

import {
    deleteCloudinaryImage,
    removeCard,
    setCardTheme,
    setCardDescription,
    setCardName,
    uploadCloudinaryImage,
    setCardProfile,
} from '../api'
import { UserContext } from '../context/UserContext'

export default function useCardEditor() {
    const [fileLoading, setFileLoading] = useState(false)
    const state = useSelector((state) => state.cards)
    const {
        userState: { username },
    } = useContext(UserContext)

    const updateProfile = async (e, id) => {
        setFileLoading(true)

        const card = state.cards.find((card) => card.id === id)

        const cloudinaryRes = await uploadCloudinaryImage(e.target.files[0])

        if (cloudinaryRes.status !== 200) {
            setFileLoading(false)
            console.log(cloudinaryRes.message)
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

        const firebaseRes = await setCardProfile(username, id, newProfile)

        if (firebaseRes.status !== 200) {
            console.log(firebaseRes.reason)
            deleteCloudinaryImage(signature, asset_id)
            setFileLoading(false)
            return
        }

        if (card.profile.url) {
            deleteCloudinaryImage(card.signature, card.assetId)
        }

        dispatch(updateCardProfile({ id, value: newProfile }))
        setFileLoading(false)
    }

    const dispatch = useDispatch()

    const updateName = (e, id) => {
        setCardName(username, id, e.target.value)
        dispatch(updateCardName({ id, value: e.target.value }))
    }

    const updateDescription = (e, id) => {
        setCardDescription(username, id, e.target.value)
        dispatch(updateCardDescription({ id, value: e.target.value }))
    }

    const updateTheme = (e, id) => {
        setCardTheme(username, id, e.target.value)
        dispatch(updateCardTheme({ id, value: e.target.value }))
    }

    const deleteMyCard = (e, id) => {
        if (fileLoading) return
        removeCard(username, id)
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
