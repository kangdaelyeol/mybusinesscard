import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import { router } from './router/index.jsx'
import { ResponsiveProvider } from './context/ResponsiveContext.jsx'
import PubSubProvider from './context/PubSubContext.jsx'

function App() {
    return (
        <ThemeProvider>
            <PubSubProvider>
                <ResponsiveProvider>
                    <Provider store={store}>
                        <RouterProvider router={router} />
                    </Provider>
                </ResponsiveProvider>
            </PubSubProvider>
        </ThemeProvider>
    )
}

export default App
