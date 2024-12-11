import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'

const routerConfig = [
    {
        path: '/',
        element: <HomePage />,
    },
]

const router = createBrowserRouter(routerConfig)

function App() {
    return <RouterProvider router={router} />
}

export default App
