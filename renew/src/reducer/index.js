export const CARD_ACTIONS = Object.freeze({
    UPDATE_NAME: Symbol.for('UPDATE_NAME'),
    UPDATE_DESCRIPTION: Symbol.for('UPDATE_DESCRIPTION'),
    UPDATE_THEME: Symbol.for('UPDATE_THEME'),
    UPDATE_PROFILE: Symbol.for('UPDATE_PROFILE'),
})

export const initialState = {
    id: '',
    name: '',
    description: '',
    theme: 'black',
    profile: '',
}

export const reducer = (state, action) => {
    switch (action.type) {
        case CARD_ACTIONS.UPDATE_NAME:
            return {
                ...state,
                name: action.payload.name,
            }
        case CARD_ACTIONS.UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload.description,
            }
        case CARD_ACTIONS.UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload.profile,
            }
        case CARD_ACTIONS.UPDATE_THEME:
            return {
                ...state,
                theme: action.payload.theme,
            }
    }
}