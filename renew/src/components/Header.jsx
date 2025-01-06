import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
import { UserContext } from '../context/UserContext'
import { initialUserState } from '../reducer'
import { DEFAULT_PROFILE } from '../constants'
import ProfileDetail from './ProfileDetail'

export default function Header() {
    const { user, setUser } = useContext(UserContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [profileDetail, setProfileDetail] = useState(true)

    const handleProfileClick = () => {
        setProfileDetail((prev) => !prev)
    }

    const handleLogoutClick = () => {
        setUser({
            ...initialUserState,
        })
    }

    return (
        <header
            className={classNames('fixed w-[100%] z-10', {
                'bg-white text-black-light': theme === 'light',
                'bg-color-black text-color-white-light': theme === 'dark',
            })}
        >
            <div className="max-w-[1100px] relative mx-auto h-header-height flex">
                <span className="inset-0 m-auto font-medium text-[1.8rem]">
                    Create Business Card
                </span>

                <div
                    className={classNames(
                        'absolute top-0 bottom-0 my-auto h-[24px] cursor-pointer select-none',
                        {
                            'right-[110px]': user.username,
                            'right-[30px]': !user.username,
                        },
                    )}
                    onClick={toggleTheme}
                >
                    <span
                        className={classNames('material-symbols-outlined', {
                            'text-color-white-light': theme === 'dark',
                        })}
                    >
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                </div>
                <div className="cursor-pointer" onClick={handleProfileClick}>
                    <img
                        alt="profile"
                        className="absolute inset-y-0 my-auto right-[25px] h-[50px] w-[50px] rounded-[50%]"
                        src={user?.profile?.url || DEFAULT_PROFILE}
                    ></img>
                </div>
                {profileDetail && <ProfileDetail user={user} />}
            </div>
        </header>
    )
}
