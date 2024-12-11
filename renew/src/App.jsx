import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Main from './components/Main'

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
    return <RouterProvider router={router} />
}

export default App
