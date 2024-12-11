import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Main from './components/Main'
import { Provider } from 'react-redux'
import { store } from './store'

const routerConfig = [
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                index: true,
                element: <Main />,
            },
        ],
    },
]

const router = createBrowserRouter(routerConfig)

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}

export default App
