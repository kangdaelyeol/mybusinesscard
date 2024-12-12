import { createContextm, useState } from 'react'

export const CardContext = createContext({
    name: '',
    description: '',
    profile: '',
    theme: '',
})

export const CardProvider = ({ children }) => {
    const [card, setCard] = useState({
        id: '',
        name: '',
        description: '',
        theme: 'black',
        profile: '',
    })
    return <CardContext.Provider value={card}>{children}</CardContext.Provider>
}
