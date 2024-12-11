import React from 'react'

export default function CardDisplay() {
    return (
        <div className="h-[230px] flex flex-1">
            <div className="w-[80%] m-auto flex gap-[20px] rounded-[20px] border-[3px] border-solid border-color-card p-[35px] bg-transparent">
                <img
                    alt="avatar"
                    src="https://avatars.githubusercontent.com/u/27201345?v=4"
                    className="rounded-[50%] w-[120px] h-[120px]"
                />
                <div className="">
                    <div className="text-white">test name</div>
                    <p className="text-white">test description</p>
                </div>
            </div>
        </div>
    )
}