import React from 'react'
import classNames from 'classnames'
const defaultProfileURL = 'https://avatars.githubusercontent.com/u/27201345?v=4'

export default function CardDisplay({ name, theme, description, profile }) {
    return (
        <div className="h-[230px] flex flex-1">
            <div
                className={classNames(
                    'w-[80%] m-auto flex gap-[20px] rounded-[20px] border-[3px] border-solid p-[35px] overflow-hidden',
                    {
                        'bg-theme-pink border-pink-300': theme === 'pink',
                        'bg-theme-black border-black': theme === 'black',
                    },
                )}
            >
                <img
                    alt="avatar"
                    src={profile.url || defaultProfileURL}
                    className="rounded-[50%] w-[120px] h-[120px]"
                />
                <div
                    className={classNames({
                        'text-gray-200': theme === 'black',
                        'text-white': theme === 'pink',
                    })}
                >
                    <div className="text-[25px] select-none">
                        {name || 'Name'}
                    </div>
                    <p className="select-none">
                        {description || 'Description'}
                    </p>
                </div>
            </div>
        </div>
    )
}
