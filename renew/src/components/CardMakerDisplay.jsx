import React, { useContext } from 'react'
import { CardContext } from '../context/CardContext'
import classNames from 'classnames'

const defaultProfileURL = 'https://avatars.githubusercontent.com/u/27201345?v=4'

export default function CardDisplay() {
    const { state } = useContext(CardContext)
    return (
        <div className="h-[230px] flex flex-1">
            <div
                className={classNames(
                    'w-[80%] m-auto flex gap-[20px] rounded-[20px] border-[3px] border-solid p-[35px] overflow-hidden',
                    {
                        'bg-theme-pink border-pink-300': state.theme === 'pink',
                        'bg-theme-black border-black': state.theme === 'black',
                    },
                )}
            >
                <img
                    alt="avatar"
                    src={state.profile.url || defaultProfileURL}
                    className="rounded-[50%] w-[120px] h-[120px]"
                />
                <div
                    className={classNames({
                        'text-gray-200': state.theme === 'black',
                        'text-white': state.theme === 'pink',
                    })}
                >
                    <div className="select-none text-[25px]">
                        {state.name || 'Name'}
                    </div>
                    <p className="select-none">
                        {state.description || 'Description'}
                    </p>
                </div>
            </div>
        </div>
    )
}
