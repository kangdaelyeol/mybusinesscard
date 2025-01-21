import {
    DEFAULT_USER,
    DEFAULT_USER_PROFILE,
    DEFAULT_USER_PROFILE_STYLE,
} from '../model/user'

export const createUserProfileStyle = (overrides = {}) => ({
    ...DEFAULT_USER_PROFILE_STYLE,
    ...overrides,
})

export const createUserProfile = (overrides = {}) => ({
    ...DEFAULT_USER_PROFILE,
    ...overrides,
    style: createUserProfileStyle(overrides.style),
})

export const createUser = (overrides = {}) => ({
    ...DEFAULT_USER,
    ...overrides,
    profile: createUserProfile(overrides.profile),
})
