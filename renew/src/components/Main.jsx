import React from 'react'
import CardEditor from './CardEditor'
import CardDisplay from './CardDisplay'
import CardMaker from './CardMaker'
import CardMakerDisplay from './CardMakerDisplay'
import { useSelector } from 'react-redux'
import { CardProvider } from '../context/CardContext'
export default function Main() {
    const state = useSelector((state) => state.cards)
    return (
        <div className="bg-gray-900 py-[100px] min-h-[100vh] mb-[-70px]">
            <div className="max-w-[1100px] mx-auto flex flex-col">
                {state.cards.map((card) => (
                    <div key={card.id} className="flex">
                        <CardEditor {...card} />
                        <CardDisplay {...card} />
                    </div>
                ))}

                <div className="flex">
                    <CardProvider>
                        <CardMaker />
                        <CardMakerDisplay />
                    </CardProvider>
                </div>
            </div>
        </div>
    )
}
