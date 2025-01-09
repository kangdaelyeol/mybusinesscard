import useCardEditor from './useCardEditor'
import useCardMaker from './useCardMaker'

const useCardEditorForm = (card) => {
    let cardModule
    let handlers
    let buttonName

    if (!card) {
        cardModule = useCardMaker()
        handlers = {
            handleNameChange: cardModule.changeName,
            handleThemeChange: cardModule.changeTheme,
            handleDescriptionChange: cardModule.changeDescription,
            handleFileInput: cardModule.uploadFile,
            handleButtonClick: cardModule.saveCard,
        }
        buttonName = 'Save'
        card = cardModule.cardState
    } else {
        cardModule = useCardEditor()
        handlers = {
            handleNameChange: (e) => cardModule.updateName(e, card.id),
            handleThemeChange: (e) => cardModule.updateTheme(e, card.id),
            handleDescriptionChange: (e) =>
                cardModule.updateDescription(e, card.id),
            handleFileInput: (e) => cardModule.updateProfile(e, card.id),
            handleButtonClick: (e) => cardModule.deleteMyCard(e, card.id),
        }
        buttonName = 'Delete'
    }

    return { handlers, buttonName, cardState: card, cardModule }
}

export default useCardEditorForm
