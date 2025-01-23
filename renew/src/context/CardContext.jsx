import { createContext, useReducer } from 'react'
import reducers from '../reducer'
import { createCard } from '../factory/cardFactory'

export const CardContext = createContext({
    state: createCard(),
    dispatch: () => {},
})

export const CardProvider = ({ children }) => {
    const [cardState, cardDispatch] = useReducer(
        reducers.cardReducer,
        createCard(),
    )
    return (
        <CardContext.Provider value={{ cardState, cardDispatch }}>
            {children}
        </CardContext.Provider>
    )
}
