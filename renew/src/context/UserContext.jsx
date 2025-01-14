import { createContext, useReducer } from 'react'
import { DEFAULT_PROFILE } from '../constants'
import reducers from '../reducer'

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
    const [userState, userDispatch] = useReducer(
        reducers.userReducer,
        initialUserState,
    )

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </UserContext.Provider>
    )
}
