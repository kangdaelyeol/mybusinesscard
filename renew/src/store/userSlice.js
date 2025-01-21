import { createSlice } from '@reduxjs/toolkit'
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
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        loginUser: (state, action) => {
            const { username, profile, nickname } = action.payload

            state.username = username
            state.profile = profile
            state.nickname = nickname
        },

        logoutUser: (state, _) => {
            const { username, profile, nickname } = initialUserState

            state.username = username
            state.profile = profile
            state.nickname = nickname
        },

        updateUserProfile: (state, action) => {
            state.profile = { ...action.payload }
        },

        updateUserProfileStyle: (state, action) => {
            state.profile.style = { ...action.payload }
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
