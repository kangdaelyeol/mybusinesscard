import React, { useContext } from 'react'
import { CardContext } from '../context/CardContext'

const defaultProfileURL = 'https://avatars.githubusercontent.com/u/27201345?v=4'

export default function CardDisplay() {
    const { state } = useContext(CardContext)
    return (
        <div className="h-[230px] flex flex-1">
            <div className="w-[80%] m-auto flex gap-[20px] rounded-[20px] border-[3px] border-solid border-color-card p-[35px] bg-transparent">
                <img
                    alt="avatar"
                    src={state.profile || defaultProfileURL}
                    className="rounded-[50%] w-[120px] h-[120px]"
                />
                <div>
                    <div className="text-white">{state.name}</div>
                    <p className="text-white">{state.description}</p>
                </div>
            </div>
        </div>
    )
}
