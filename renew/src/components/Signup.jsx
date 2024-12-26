import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ThemeContext } from '../context/ThemeContext'
import LoadingSpinner from './LoadingSpinner'

export default function Signup() {
    const { theme } = useContext(ThemeContext)
    const [signupInput, setSignupInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false)

    const handleUsernameInput = (e) => {
        setSignupInput((prev) => ({ ...prev, username: e.target.value }))
    }

    const handlePasswordInput = (e) => {
        setSignupInput((prev) => ({ ...prev, password: e.target.value }))
    }

    const handleConfirmPasswordInput = (e) => {
        setSignupInput((prev) => ({ ...prev, confirmPassword: e.target.value }))
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form
            onSubmit={handleSignupSubmit}
            className={classNames(
                'min-h-[100vh] pt-header-height mb-footer-height',
                {
                    'bg-color-black-semilight': theme === 'dark',
                    'bg-color-white-light': theme === 'light',
                },
            )}
        >
            <div className="flex flex-col px-[30px] py-[20px] bg-color-white w-[400px] m-auto mt-[60px]">
                <div className="text-[30px] font-bold text-center text-color-black-light">
                    SIGN UP
                </div>
                <input
                    className="bg-transparent border-b-[1px] border-solid border-gray-light p-[5px] mt-[30px] text-[18px]"
                    type="text"
                    placeholder="Username"
                    value={signupInput.username}
                    onChange={handleUsernameInput}
                />
                <input
                    className="bg-transparent border-b-[1px] border-solid border-gray-light p-[5px] mt-[20px] text-[18px]"
                    type="password"
                    placeholder="Password"
                    value={signupInput.password}
                    onChange={handlePasswordInput}
                />

                <input
                    className="bg-transparent border-b-[1px] border-solid border-gray-light p-[5px] mt-[20px] text-[18px]"
                    type="password"
                    placeholder="Confirm Password"
                    value={signupInput.confirmPassword}
                    onChange={handleConfirmPasswordInput}
                />

                <button
                    className={classNames(
                        'text-color-white py-[7px] mt-[30px]',
                        {
                            'bg-color-gray-light hover:bg-color-black-light':
                                theme === 'dark',
                            'bg-color-blue hover:bg-color-blue-light':
                                theme === 'light',
                        },
                    )}
                >
                    {loading ? <LoadingSpinner /> : 'Log in'}
                </button>

                <label className="mt-[20px]" htmlFor="remember">
                    <input
                        id="remember"
                        type="checkbox"
                        className="mr-[5px] border-30px border-solid border-gray-300"
                    />
                    <span className="cursor-pointer select-none text-color-gray">
                        Remember me
                    </span>
                </label>
            </div>
            <Link
                className={classNames(
                    'block mx-auto w-[400px] text-center mt-[15px] hover:underline',
                    {
                        'text-color-gray': theme === 'dark',
                        'text-color-blue-light': theme === 'light',
                    },
                )}
                to="/login"
            >
                have an account?
            </Link>
        </form>
    )
}
