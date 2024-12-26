import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import LoadingSpinner from './LoadingSpinner'
import useLogin from '../hooks/useLogin'
import { UserContext } from '../context/UserContext'
import { ThemeContext } from '../context/ThemeContext'
export default function Login() {
    const { theme } = UserContext(ThemeContext)

    const {
        loading,
        handleUserLogin,
        handleUsernameInput,
        handlePasswordInput,
        loginInput,
    } = useLogin()

    return (
        <form
            onSubmit={handleUserLogin}
            className={classNames(
                'min-h-[100vh] pt-header-height mb-footer-height',
                {
                    'bg-color-black-semilight': theme === 'dark',
                    'bg-color-white-light': theme === 'light',
                },
            )}
        >
            <div className="flex flex-col px-[30px] py-[20px] bg-color-white w-[400px] m-auto mt-[80px]">
                <div className="text-[30px] font-bold text-center text-color-black-light">
                    LOG IN
                </div>
                <input
                    className="bg-transparent border-b-[1px] border-solid border-gray-light p-[5px] mt-[30px] text-[18px]"
                    type="text"
                    placeholder="Username"
                    value={loginInput.username}
                    onChange={handleUsernameInput}
                />
                <input
                    className="bg-transparent border-b-[1px] border-solid border-gray-light p-[5px] mt-[20px] text-[18px]"
                    type="password"
                    placeholder="Password"
                    value={loginInput.password}
                    onChange={handlePasswordInput}
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
                to="/signup"
            >
                Don't have an account?
            </Link>
        </form>
    )
}
