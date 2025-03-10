import { createContext, useState } from 'react'

export const ThemeContext = createContext({
    theme: 'dark',
    setTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
