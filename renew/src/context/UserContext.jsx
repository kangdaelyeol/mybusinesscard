import React, { createContext, useState } from 'react'

export const initialState = {
    user: { username: '', profile: '', cards: '' },
    setUser: () => {},
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ ...initialState })
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
