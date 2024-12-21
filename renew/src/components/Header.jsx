import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
export default function Header() {
    const isLogin = true
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <header
            className={classNames('fixed w-[100%]', {
                'bg-white text-black-light': theme === 'light',
                'bg-color-black text-text-white': theme === 'dark',
            })}
        >
            <div className="max-w-[1100px] relative mx-auto h-header-height flex">
                {isLogin && (
                    <div>
                        <img
                            alt="profile"
                            className="absolute inset-y-0 my-auto left-[20px] h-[50px] w-[50px] rounded-[50%] ml-[15px]"
                            src="https://avatars.githubusercontent.com/u/27201345?v=4"
                        ></img>
                    </div>
                )}

                <span className="inset-0 m-auto font-medium text-[1.8rem]">
                    Create Business Card
                </span>

                <div
                    className=" absolute top-0 bottom-0 my-auto h-[24px] right-[110px] cursor-pointer select-none"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? (
                        <span className="material-symbols-outlined text-text-white">
                            light_mode
                        </span>
                    ) : (
                        <span className="material-symbols-outlined">
                            dark_mode
                        </span>
                    )}
                </div>
                {isLogin && (
                    <div className="btn-black absolute h-[40px] leading-[40px] px-[10px] right-[20px] top-0 bottom-0 my-auto text-[1rem] font-bold border-[1px] rounded-[5px] cursor-pointer transition-all">
                        logout
                    </div>
                )}
            </div>
        </header>
    )
}
