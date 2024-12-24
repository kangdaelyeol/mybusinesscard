import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
import { userLogin } from '../api'
import LoadingSpinner from './LoadingSpinner'
export default function Login() {
    const { theme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const [loginInput, setLoginInput] = useState({ username: '', password: '' })

    const handleUserLogin = async () => {
        if (loading) return
        setLoading(true)

        const res = await userLogin(loginInput.username, loginInput.password)
        console.log(res)
        setLoading(false)
    }

    const handleUsernameInput = (e) => {
        setLoginInput((prev) => ({ ...prev, username: e.target.value }))
    }

    const handlePasswordInput = (e) => {
        setLoginInput((prev) => ({ ...prev, password: e.target.value }))
    }
    return (
        <div
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
                    onClick={handleUserLogin}
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
                to="#"
            >
                Don't have an account?
            </Link>
        </div>
    )
}
