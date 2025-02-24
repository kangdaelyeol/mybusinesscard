import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { FixedSizeList as List } from 'react-window'
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
    const state = useSelector((state) => state.cards)

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

                                width={width}
                                height={height}
                                itemSize={cardItemHeight}
                            >
                                {({ style, index }) => (
                </div>
            </div>
            {createCard && <CreateCard />}
        </div>
    )
}
