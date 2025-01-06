import React, { createContext, useState } from 'react'
import { initialState } from '../reducer'

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ ...initialState })
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
