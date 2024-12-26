import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

export default function GuestOnly({ children }) {
    const { user } = useContext(UserContext)

    if (user?.username) return <Navigate to="/" replace />

    return children
}
