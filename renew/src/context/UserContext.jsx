import React, { createContext, useState } from 'react'
import { initialUserState } from '../reducer'

export const UserContext = createContext({
    user: { ...initialUserState },
    setUser: () => {},
})

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        ...initialUserState,
    })
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
