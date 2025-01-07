import { initialUserState } from '../context/UserContext'

export const USER_ACTIONS = Object.freeze({
    LOGIN: Symbol.for('USER_LOGIN'),
    LOGOUT: Symbol.for('USER_LOGOUT'),
    UPDATE_PROFILE: Symbol.for('USER_UPDATE_PROFILE'),
    UPDATE_PROFILE_STYLE: Symbol.for('USER_UPDATE_PROFILE_STYLE'),
})

const reducer = (state, action) => {
    switch (action.type) {
        case USER_ACTIONS.LOGIN:
            const { id, profile, cards, nickname } = action.payload.user
            return {
                username: id,
                profile,
                cards,
                nickname,
            }
        case USER_ACTIONS.LOGOUT:
            return { ...initialUserState }

        case USER_ACTIONS.UPDATE_PROFILE:
            return {
                ...state,
                profile: { ...action.payload.profile },
            }

        case USER_ACTIONS.UPDATE_PROFILE_STYLE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    style: { ...action.payload.style },
                },
            }
    }
}

export default reducer
