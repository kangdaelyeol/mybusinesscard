import { createContext, useReducer } from 'react'
import { cardReducer } from '../reducer'
import cardFactory from '../factory/cardFactory'

export const CardContext = createContext({
    state: cardFactory.createCard(),
    dispatch: () => {},
})

export const CardProvider = ({ children }) => {
    const [cardState, cardDispatch] = useReducer(
        cardReducer,
        cardFactory.createCard(),
    )
    return (
        <CardContext.Provider value={{ cardState, cardDispatch }}>
            {children}
        </CardContext.Provider>
    )
}
