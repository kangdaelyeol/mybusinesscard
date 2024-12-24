import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Main from './components/Main'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import Login from './components/Login'

const routerConfig = [
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
]

const router = createBrowserRouter(routerConfig)

function App() {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ThemeProvider>
    )
}

export default App
