import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
export default function Footer() {
    const { theme } = useContext(ThemeContext)
    return (
        <footer
            className={classNames(
                'h-footer-height w-full flex justify-center items-center',
                {
                    'bg-color-black text-text-white': theme === 'dark',
                    'bg-white text-color-black-light': theme === 'light',
                },
            )}
        >
            <a
                href="https://github.com/kangdaelyeol"
                target="_blank"
                className="font-bold text-[15px] hover:underline"
            >
                rkdeofuf
            </a>
        </footer>
    )
}
