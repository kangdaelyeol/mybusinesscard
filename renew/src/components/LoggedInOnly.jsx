import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
export default function LoggedInOnly({ children }) {
    const { user } = useContext(UserContext)

    if (!user?.username) return <Navigate to="/login" replace />

    return children
}
