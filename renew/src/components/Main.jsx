import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import {
    ThemeContext,
    PubSubContext,
    EVENT_TYPES,
    ResponsiveContext,
} from '@/context'
import CardDisplay from '@/components/CardDisplay'
import CardEditor from '@/components/CardEditor'
import CreateCard from '@/components/CreateCard'

export default function Main() {
    const { theme } = useContext(ThemeContext)
    const { cards } = useSelector((state) => state.cards)

    const [createCard, setCreateCard] = useState(false)

    const { subscribe, unSubscribe } = useContext(PubSubContext)

    const showCreateCard = () => setCreateCard(true)

    useEffect(() => {
        const hideCreateCard = () => {
            setCreateCard(false)
        }
        subscribe(EVENT_TYPES.HIDE_CREATE_CARD, hideCreateCard)

        return () => {
            unSubscribe(EVENT_TYPES.HIDE_CREATE_CARD, hideCreateCard)
        }
    }, [])

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
            <div className="max-w-[1100px] overflow-scroll mx-auto flex flex-col gap-[20px]">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="flex gap-[20px] max-medium:flex-col-reverse max-medium:mt-[20px]"
                    >
                        <CardEditor card={card} />
                        <CardDisplay card={card} />
                    </div>
                ))}
            </div>
            <div
                className={classNames(
                    'fixed bottom-[20px] right-[20px] w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-[50%]',
                    {
                        'bg-color-white/40 hover:bg-color-white text-color-gray hover:text-color-black':
                            theme === 'dark',
                        'bg-color-blue/40 hover:bg-color-blue text-color-white hover:bg-color-blue-light':
                            theme === 'light',
                    },
                )}
                onClick={showCreateCard}
            >
                <span className="material-symbols-outlined font-lightbold text-[30px]">
                    add
                </span>
            </div>
            {createCard && <CreateCard />}
        </div>
    )
}
