import React from 'react'
import CardEditor from './CardEditor'
import CardDisplay from './CardDisplay'

export default function Main() {
    return (
        <div className="bg-gray-900">
            <div className="max-w-[1100px] mx-auto flex">
                <CardEditor />
                <CardDisplay />
            </div>
        </div>
    )
}
