import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

export default function GuestOnly({ children }) {
    const { userState } = useContext(UserContext)

    if (userState?.username) return <Navigate to="/" replace />

    return children
}
