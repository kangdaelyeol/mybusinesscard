import { useContext } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { CardProvider, ThemeContext } from '@/context'
import CardDisplay from '@/components/CardDisplay'
import CardEditor from '@/components/CardEditor'
import CardMaker from '@/components/CardMaker'

export default function Main() {
    const { theme } = useContext(ThemeContext)
    const state = useSelector((state) => state.cards)

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
            <div className="max-w-[1100px] mx-auto flex flex-col gap-[20px] mt-[20px]">
                {state.cards.map((card) => (
                    <div
                        key={card.id}
                        className="flex gap-[20px] max-medium:flex-col-reverse"
                    >
                        <CardEditor card={card} />
                        <CardDisplay card={card} />
                    </div>
                ))}

                <div className="flex gap-[20px] max-medium:flex-col-reverse">
                    <CardProvider>
                        <CardMaker />
                        <CardDisplay />
                    </CardProvider>
                </div>
            </div>
        </div>
    )
}
