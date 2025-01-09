import { useContext, useState } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer/cardReducer'
import { deleteCloudinaryImage, setCard, uploadCloudinaryImage } from '../api'
import { useDispatch } from 'react-redux'
import { createCard } from '../store/cardsSlice'
import { UserContext } from '../context/UserContext'

export default function useCardMaker() {
    const { cardState, cardDispatch } = useContext(CardContext)
    const { userState } = useContext(UserContext)
    const dispatch = useDispatch()
    const [fileLoading, setFileLoading] = useState(false)
    const changeDescription = (e) => {
        cardDispatch({
            type: CARD_ACTIONS.UPDATE_DESCRIPTION,
            payload: { description: e.target.value },
        })
    }

    const changeName = (e) => {
        cardDispatch({
            type: CARD_ACTIONS.UPDATE_NAME,
            payload: { name: e.target.value },
        })
    }

    const changeTheme = (e) => {
        cardDispatch({
            type: CARD_ACTIONS.UPDATE_THEME,
            payload: { theme: e.target.value },
        })
    }

    const uploadFile = async (e) => {
        setFileLoading(true)

        const res = await uploadCloudinaryImage(e.target.files[0])

        if (res.status !== 200) {
            console.log(res.message)
            setFileLoading(false)
            return
        }

        if (cardState.profile.url)
            deleteCloudinaryImage(
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
                profile: {
                    url,
                    assetId: asset_id,
                    signature,
                    publicId: public_id,
                    timestamp,
                    style: {
                        scale: 1,
                        transX: 0,
                        transY: 0,
                        rounded: 50,
                        width,
                        height,
                    },
                },
            },
        })
        setFileLoading(false)
    }

    const saveCard = async () => {
        if (fileLoading) return
        const cardID = Date.now()

        const newCard = {
            ...cardState,
            id: cardID,
        }
        const res = await setCard(userState.username, newCard)
        if (res.status !== 200) {
            console.log('Error - setCard: ', res.reason)
            return
        }
        dispatch(createCard({ card: newCard }))
        cardDispatch({ type: CARD_ACTIONS.CLEAR_CARD })
    }

    return {
        cardState,
        changeDescription,
        changeName,
        changeTheme,
        uploadFile,
        saveCard,
        fileLoading,
    }
}
