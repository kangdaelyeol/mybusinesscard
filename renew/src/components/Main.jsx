import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
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
    const { cardItemHeight, cardListHeight } = useContext(ResponsiveContext)
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
            <div
                className="max-w-[1100px] h-[var(--list-height)] mb-footer-height mx-auto flex flex-col gap-[20px]"
                style={{
                    '--list-height': `${cardListHeight}px`,
                }}
            >
                {state.cards.length > 0 && (
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                itemCount={state.cards.length}
                                width={width}
                                height={height}
                                itemSize={cardItemHeight}
                            >
                                {({ style, index }) => (
                                    <div
                                        key={state.cards[index].id}
                                        style={style}
                                        className="flex gap-[20px] max-medium:flex-col-reverse"
                                    >
                                        <CardEditor card={state.cards[index]} />
                                        <CardDisplay
                                            card={state.cards[index]}
                                        />
                                    </div>
                                )}
                            </List>
                        )}
                    </AutoSizer>
                )}
                <div
                    className={classNames(
                        'absolute bottom-[100px] right-[20px] w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-[50%]',
                        {
                            'bg-color-white text-color-gray hover:text-color-black':
                                theme === 'dark',
                            'bg-color-blue text-color-white hover:bg-color-blue-light':
                                theme === 'light',
                        },
                    )}
                    onClick={showCreateCard}
                >
                    <span className="material-symbols-outlined font-lightbold text-[30px]">
                        add
                    </span>
                </div>
            </div>
            {createCard && <CreateCard />}
        </div>
    )
}
