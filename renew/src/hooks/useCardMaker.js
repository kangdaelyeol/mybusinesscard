import { useContext, useState } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer/cardReducer'
import { cardClient, imageClient } from '../client'
import { useDispatch, useSelector } from 'react-redux'
import { createCard } from '../store/cardsSlice'
import { createCardProfile } from '../factory/cardFactory'

export default function useCardMaker() {
    const { cardState, cardDispatch } = useContext(CardContext)
    const userState = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [fileLoading, setFileLoading] = useState(false)

    const handlers = {
        handleDescriptionChange: (e) => {
            cardDispatch({
                type: CARD_ACTIONS.UPDATE_DESCRIPTION,
                payload: { description: e.target.value },
            })
        },

        handleNameChange: (e) => {
            cardDispatch({
                type: CARD_ACTIONS.UPDATE_NAME,
                payload: { name: e.target.value },
            })
        },

        handleThemeChange: (e) => {
            cardDispatch({
                type: CARD_ACTIONS.UPDATE_THEME,
                payload: { theme: e.target.value },
            })
        },

        handleFileInput: async (e) => {
            setFileLoading(true)

            const res = await imageClient.uploadInCloudinary(e.target.files[0])

            if (res.status !== 200) {
                console.error('Error - uploadInClodinary: ', res.message)
                setFileLoading(false)
                return
            }

            if (cardState.profile.url)
                imageClient.deleteInCloudinary(
                    cardState.profile.signature,
                    cardState.profile.assetId,
                )

            const {
                url,
                asset_id,
                signature,
                public_id,
                timestamp,
                width,
                height,
            } = res.data

            cardDispatch({
                type: CARD_ACTIONS.UPDATE_PROFILE,
                payload: {
                    profile: createCardProfile({
                        url,
                        assetId: asset_id,
                        signature,
                        publicId: public_id,
                        timestamp,
                        style: {
                            width,
                            height,
                        },
                    }),
                },
            })
            setFileLoading(false)
        },

        handleCardSave: async () => {
            if (fileLoading) return
            const cardID = Date.now()

            const newCard = {
                ...cardState,
                id: cardID,
            }
            const res = await cardClient.create(userState.username, newCard)
            if (res.status !== 200) {
                console.error('Error - setCard: ', res.reason)
                return
            }
            dispatch(createCard({ card: newCard }))
            cardDispatch({ type: CARD_ACTIONS.CLEAR_CARD })
        },
    }

    return {
        cardState,
        handlers,
        fileLoading,
    }
}
