import { useContext, useState } from 'react'
import { CardContext } from '../context/CardContext'
import { CARD_ACTIONS } from '../reducer/cardReducer'
import { deleteCloudinaryImage, uploadCloudinaryImage } from '../api'
import { useDispatch } from 'react-redux'
import { createCard } from '../store/cardsSlice'

export default function useCardMaker() {
    const { state, dispatch } = useContext(CardContext)
    const dispatchRedux = useDispatch()
    const [fileLoading, setFileLoading] = useState(false)
    const changeDescription = (e) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_DESCRIPTION,
            payload: { description: e.target.value },
        })
    }

    const changeName = (e) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_NAME,
            payload: { name: e.target.value },
        })
    }

    const changeTheme = (e) => {
        dispatch({
            type: CARD_ACTIONS.UPDATE_THEME,
            payload: { theme: e.target.value },
        })
    }

    const uploadFile = async (e) => {
        setFileLoading(true)

        const res = await uploadCloudinaryImage(e.target.files[0])
        if (state.profile.url)
            deleteCloudinaryImage(
                state.profile.signature,
                state.profile.assetId,
            )

        if (res.status !== 200) {
            console.log(res.message)
            setFileLoading(false)
            return
        }

        const {
            url,
            asset_id,
            signature,
            public_id,
            timestamp,
            width,
            height,
        } = res.data

        dispatch({
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

    const saveCard = () => {
        if (fileLoading) return
        const cardID = Date.now()
        dispatchRedux(createCard({ card: { ...state, id: cardID } }))
        dispatch({ type: CARD_ACTIONS.CLEAR_CARD })
    }

    return {
        state,
        changeDescription,
        changeName,
        changeTheme,
        uploadFile,
        saveCard,
        fileLoading,
    }
}
