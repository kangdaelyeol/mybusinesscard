import React, { useContext } from 'react'
import CardEditor from './CardEditor'
import CardDisplay from './CardDisplay'
import CardMaker from './CardMaker'
import CardMakerDisplay from './CardMakerDisplay'
import { useSelector } from 'react-redux'
import { CardProvider } from '../context/CardContext'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
export default function Main() {
    const { theme } = useContext(ThemeContext)
    const state = useSelector((state) => state.cards)
    return (
        <div
            className={classNames('py-[100px] min-h-[100vh] mb-[-70px]', {
                'bg-color-white': theme === 'light',
                'bg-color-black-semilight': theme === 'dark',
            })}
        >
            <div className="max-w-[1100px] mx-auto flex flex-col">
                {state.cards.map((card) => (
                    <div key={card.id} className="flex">
                        <CardEditor card={card} />
                        <CardDisplay card={card} />
                    </div>
                ))}

                <div className="flex">
                    <CardProvider>
                        <CardMaker />
                        <CardDisplay />
                    </CardProvider>
                </div>
            </div>
        </div>
    )
}
