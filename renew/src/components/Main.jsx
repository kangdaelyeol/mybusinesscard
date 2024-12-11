import React from 'react'
import CardEditor from './CardEditor'
import CardDisplay from './CardDisplay'
import CardMaker from './CardMaker'
import CardMakerDisplay from './CardMakerDisplay'
import { useSelector } from 'react-redux'
export default function Main() {
    const state = useSelector((state) => state.cards)
    return (
        <div className="bg-gray-900">
            <div className="max-w-[1100px] mx-auto flex flex-col">
                {state.cards.map((card) => (
                    <div key={card.id} className="flex">
                        <CardEditor {...card} />
                        <CardDisplay {...card} />
                    </div>
                ))}

                <div className="flex">
                    <CardMaker />
                    <CardMakerDisplay />
                </div>
            </div>
        </div>
    )
}
