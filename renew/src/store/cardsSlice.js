import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
    },
    reducers: {
        updateCardName: (state, action) => {
            const { id, value } = action.payload
            state.cards = state.cards.map((card) => {
                if (card.id === id) card.name = value
                return card
            })
        },

        updateCardDescription: (state, action) => {
            const { id, value } = action.payload
            state.cards = state.cards.map((card) => {
                if (card.id === id) card.description = value
                return card
            })
        },

        updateCardTheme: (state, action) => {
            const { id, value } = action.payload
            state.cards = state.cards.map((card) => {
                if (card.id === id) card.theme = value
                return card
            })
        },

        updateCardProfile: (state, action) => {
            const { id, value } = action.payload
            state.cards = state.cards.map((card) => {
                if (card.id === id) card.profile = value
                return card
            })
        },

        deleteCard: (state, action) => {
            console.log(action.payload.id)
            state.cards = state.cards.filter(
                (card) => card.id !== action.payload.id,
            )
        },

        createCard: (state, action) => {
            state.cards.push(action.payload.card)
        },
    },
})

export const {
    createCard,
    updateCardDescription,
    updateCardName,
    updateCardTheme,
    updateCardProfile,
    deleteCard,
} = cardsSlice.actions

export default cardsSlice.reducer
