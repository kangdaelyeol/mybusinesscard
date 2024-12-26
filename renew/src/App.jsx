import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'

import { router } from './router/index.jsx'

function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App
