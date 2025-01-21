import { createSlice } from '@reduxjs/toolkit'
import { createUser } from '../factory/userFactory'

const userSlice = createSlice({
    name: 'user',
    initialState: createUser(),
    reducers: {
        loginUser: (state, action) => {
            const { username, profile, nickname } = action.payload

            state.username = username
            state.profile = profile
            state.nickname = nickname
        },

        logoutUser: (state, _) => {
            const { username, profile, nickname } = createUser()

            state.username = username
            state.profile = profile
            state.nickname = nickname
        },

        updateUserProfile: (state, action) => {
            state.profile = action.payload
        },

        updateUserProfileStyle: (state, action) => {
            state.profile.style = action.payload
        },

        updateUserNickname: (state, action) => {
            state.nickname = action.payload
        },
    },
})

export const {
    loginUser,
    logoutUser,
    updateUserProfile,
    updateUserProfileStyle,
    updateUserNickname,
} = userSlice.actions

export default userSlice.reducer
