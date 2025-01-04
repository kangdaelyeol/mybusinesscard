import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { ThemeContext } from '../context/ThemeContext'
import LoadingSpinner from './LoadingSpinner'
import useSignup from '../hooks/useSignup'

export default function Signup() {
    const { theme } = useContext(ThemeContext)
    const {
        handleUsernameInput,
        handlePasswordInput,
        handleConfirmPasswordInput,
        handleSignupSubmit,
        loading,
        signupInput,
        errorMessage,
    } = useSignup()

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
            <div className="flex flex-col px-[30px] py-[20px] bg-color-white w-[400px] m-auto mt-[50px]">
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

                {errorMessage && (
                    <div className="text-center whitespace-pre-wrap text-red-600 mt-[10px]">
                        {errorMessage}
                    </div>
                )}

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
                    {loading ? <LoadingSpinner /> : 'Sign up'}
                </button>
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