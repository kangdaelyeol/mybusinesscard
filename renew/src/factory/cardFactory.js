import {
    DEFAULT_CARD,
    DEFAULT_CARD_PROFILE,
    DEFAULT_CARD_PROFILE_STYLE,
} from '../model/card'

export const createCardProfileStyle = (overrides = {}) => ({
    ...DEFAULT_CARD_PROFILE_STYLE,
    ...overrides,
})

export const createCardProfile = (overrides = {}) => ({
    ...DEFAULT_CARD_PROFILE,
    ...overrides,
    style: createCardProfileStyle(overrides.style),
})

export const createCard = (overrides = {}) => ({
    ...DEFAULT_CARD,
    ...overrides,
    profile: createCardProfile(overrides.profile),
})
