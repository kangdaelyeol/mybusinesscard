import { createContext, useReducer } from 'react'
import reducers from '../reducer'
import { DEFAULT_CARD_PROFILE } from '../constants'

export const initialCardState = {
    id: '',
    name: '',
    description: '',
    theme: 'black',
    profile: {
        url: DEFAULT_CARD_PROFILE,
        assetId: '',
        signature: '',
        publicId: '',
        style: {
            scale: 1,
            transX: 0,
            transY: 0,
            rounded: 50,
            width: 120,
            height: 120,
        },
    },
}

export const CardContext = createContext({
    state: initialCardState,
    dispatch: () => {},
})

export const CardProvider = ({ children }) => {
    const [cardState, cardDispatch] = useReducer(reducers.cardReducer, {
        ...initialCardState,
    })
    return (
        <CardContext.Provider value={{ cardState, cardDispatch }}>
            {children}
        </CardContext.Provider>
    )
}
