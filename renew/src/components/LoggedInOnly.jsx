import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
export default function LoggedInOnly({ children }) {
    const { userState } = useContext(UserContext)

    if (!userState?.username) return <Navigate to="/login" replace />

    return children
}
