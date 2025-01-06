import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
import { initialState, UserContext } from '../context/UserContext'
import { DEFAULT_PROFILE } from '../constants'
export default function Header() {
    const { user, setUser } = useContext(UserContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const handleLogoutClick = () => {
        setUser({
            ...initialState,
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
                {user?.username && (
                    <div>
                        <img
                            alt="profile"
                            className="absolute inset-y-0 my-auto left-[20px] h-[50px] w-[50px] rounded-[50%] ml-[15px]"
                            src={user?.profile?.url || DEFAULT_PROFILE}
                        ></img>
                    </div>
                )}

                {user?.nickname && (
                    <div className="text-[24px] flex items-center text-color-white absolute top-0 bottom-0 my-auto left-[110px]">
                        {user.nickname}
                    </div>
                )}

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
                {user?.username && (
                    <div
                        onClick={handleLogoutClick}
                        className={classNames(
                            'absolute h-[40px] leading-[40px] px-[10px] right-[20px] top-0 bottom-0 my-auto text-[1rem] font-bold border-[1px] rounded-[5px] transition-all',
                            {
                                'btn-dark': theme === 'dark',
                                'btn-light': theme === 'light',
                            },
                        )}
                    >
                        logout
                    </div>
                )}
            </div>
        </header>
    )
}
