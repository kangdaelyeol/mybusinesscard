import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
import { UserContext } from '../context/UserContext'
import ProfileDetail from './ProfileDetail'
import ImgDisplay from './ImgDisplay'
import { USER_ACTIONS } from '../reducer/userReducer'

export default function Header() {
    const { userState, userDispatch } = useContext(UserContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [profileDetail, setProfileDetail] = useState(false)

    const handleProfileClick = () => {
        if (!userState.username) return
        setProfileDetail((prev) => !prev)
    }

    const handleLogoutClick = () => {
        userDispatch({ type: USER_ACTIONS.LOGOUT })
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
                            'right-[110px]': userState.username,
                            'right-[30px]': !userState.username,
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
                <div
                    className="absolute inset-y-0 my-auto right-[30px] h-[50px] w-[50px] cursor-pointer"
                    onClick={handleProfileClick}
                >
                    <ImgDisplay size={50} profile={userState.profile} />
                </div>
                {profileDetail && <ProfileDetail />}
            </div>
        </header>
    )
}
