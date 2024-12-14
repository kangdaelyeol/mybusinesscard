import React from 'react'

export default function CardDisplay({ name, theme, description }) {
    return (
        <div className="h-[230px] flex flex-1">
            <div className="w-[80%] m-auto flex gap-[20px] rounded-[20px] border-[3px] border-solid border-color-card p-[35px] bg-transparent">
                <img
                    alt="avatar"
                    src="https://avatars.githubusercontent.com/u/27201345?v=4"
                    className="rounded-[50%] w-[120px] h-[120px]"
                />
                <div>
                    <div className="text-white">{name}</div>
                    <p className="text-white">{description}</p>
                </div>
            </div>
        </div>
    )
}
