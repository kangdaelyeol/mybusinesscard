import { createContext, useReducer, useState } from 'react'
import { initialState, reducer } from '../reducer'

export const CardContext = createContext({
    state: initialState,
    dispatch: () => {},
})

export const CardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState })
    return (
        <CardContext.Provider value={{ state, dispatch }}>
            {children}
        </CardContext.Provider>
    )
}
