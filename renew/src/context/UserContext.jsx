import React, { createContext, useState } from 'react'
import { DEFAULT_PROFILE } from '../constants'

export const initialUserState = {
    username: '',
    nickname: '',
    profile: {
        url: DEFAULT_PROFILE,
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
    cards: [],
}

export const UserContext = createContext({
    ...initialUserState,
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
