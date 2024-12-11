import React from 'react'
import CardEditor from './CardEditor'
import CardDisplay from './CardDisplay'
import CardMaker from './CardMaker'
import CardMakerDisplay from './CardMakerDisplay'
export default function Main() {
    return (
        <div className="bg-gray-900">
            <div className="max-w-[1100px] mx-auto flex flex-col">
                <div className="flex">
                    <CardEditor />
                    <CardDisplay />
                </div>
                <div className="flex">
                    <CardMaker />
                    <CardMakerDisplay />
                </div>
            </div>
        </div>
    )
}
