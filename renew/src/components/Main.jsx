import { useContext } from 'react'
import CardDisplay from './CardDisplay'
import { useSelector } from 'react-redux'
import { CardProvider } from '../context/CardContext'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'
import CardEditor from './CardEditor'
import CardMaker from './CardMaker'
export default function Main() {
    const { theme } = useContext(ThemeContext)
    const state = useSelector((state) => state.cards)

    console.log(state.cards)
    return (
        <div
            className={classNames(
                'py-header-height min-h-[100vh] mb-footer-height',
                {
                    'bg-color-white': theme === 'light',
                    'bg-color-black-semilight': theme === 'dark',
                },
            )}
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
