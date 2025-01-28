import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import { router } from './router/index.jsx'
import { ResponsiveProvider } from './context/ResponsiveContext.jsx'
import PubSubProvider from './context/PubSubContext.jsx'
import { ToasterMessageProvider } from './context/ToasterMessageContext.jsx'

function App() {
    return (
        <ThemeProvider>
            <PubSubProvider>
                <ResponsiveProvider>
                    <ToasterMessageProvider>
                        <Provider store={store}>
                            <RouterProvider router={router} />
                        </Provider>
                    </ToasterMessageProvider>
                </ResponsiveProvider>
            </PubSubProvider>
        </ThemeProvider>
    )
}

export default App
