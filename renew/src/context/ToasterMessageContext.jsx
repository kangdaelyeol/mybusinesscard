import { createContext, useState } from 'react'

const TOAST_MESSAGE_TIMER = 1000

export const ToasterMessageContext = createContext({
    toasterMessage: '',
    setToasterMessageTimeOut: () => {},
})

export const ToasterMessageProvider = ({ children }) => {
    const [toasterMessage, setToasterMessage] = useState('')
    const [timerId, setTimerId] = useState(null)

    const setToasterMessageTimeOut = (message) => {
        if (timerId) clearTimeout(timerId)

        const id = setTimeout(() => {
            setToasterMessage('')
            setTimerId(null)
        }, TOAST_MESSAGE_TIMER)

        setToasterMessage(message)
        setTimerId(id)
    }

    return (
        <ToasterMessageContext.Provider
            value={{ toasterMessage, setToasterMessageTimeOut }}
        >
            {children}
        </ToasterMessageContext.Provider>
    )
}
