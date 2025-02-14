import { createBrowserRouter } from 'react-router-dom'
import LoggedInOnly from '@/components/LoggedInOnly'
import GuestOnly from '@/components/GuestOnly'
import Signup from '@/components/Signup'
import HomePage from '@/pages/HomePage'
import Main from '@/components/Main'
import Login from '@/components/Login'
import AccountDetail from '@/components/AccountDetail'
import ChangePassword from '@/components/ChangePassword'

export const router = createBrowserRouter([
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
            {
                path: 'account',
                element: (
                    <LoggedInOnly>
                        <AccountDetail />
                    </LoggedInOnly>
                ),
            },
            {
                path: 'change-password',
                element: (
                    <LoggedInOnly>
                        <ChangePassword />
                    </LoggedInOnly>
                ),
            },
        ],
    },
])
