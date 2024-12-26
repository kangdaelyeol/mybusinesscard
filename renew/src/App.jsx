import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Main from './components/Main'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import Login from './components/Login'
import { UserProvider } from './context/UserContext'
import LoggedInOnly from './components/LoggedInOnly'
import GuestOnly from './components/GuestOnly'
import Signup from './components/Signup'

const routerConfig = [
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                index: true,
                element: (
                    <LoggedInOnly>
                        <Main />
                    </LoggedInOnly>
                ),
            },
            {
                path: 'login',
                element: (
                    <GuestOnly>
                        <Login />
                    </GuestOnly>
                ),
            },
            {
                path: 'signup',
                element: (
                    <GuestOnly>
                        <Signup />
                    </GuestOnly>
                ),
            },
        ],
    },
]

const router = createBrowserRouter(routerConfig)

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
