import { useEffect, useState, createContext } from 'react'
import {
    PICTURE_BOX_SIZE,
    PICTURE_BOX_SIZE_MEDIUM,
    RATE_BAR_WIDTH,
    RATE_BAR_WIDTH_MEDIUM,
    CARD_ITEM_HEIGHT,
    CARD_ITEM_HEIGHT_MEDIUM,
    FOOTER_HEIGHT,
    HEADER_HEIGHT,
} from '@/constants'
import { throttle } from 'lodash'

export const ResponsiveContext = createContext({
    barWidth: RATE_BAR_WIDTH,
    pictureSize: PICTURE_BOX_SIZE,
    cardItemHeight: CARD_ITEM_HEIGHT,
    cardListHeight: window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT,
})

export const ResponsiveProvider = ({ children }) => {
    const [responsive, setResponsive] = useState({
        barWidth: RATE_BAR_WIDTH,
        pictureSize: PICTURE_BOX_SIZE,
        cardItemHeight: CARD_ITEM_HEIGHT,
        cardListHeight: window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT,
    })

    useEffect(() => {
        const onResizeWindow = throttle(() => {
            if (innerWidth <= 900) {
                setResponsive({
                    barWidth: RATE_BAR_WIDTH_MEDIUM,
                    pictureSize: PICTURE_BOX_SIZE_MEDIUM,
                    cardItemHeight: CARD_ITEM_HEIGHT_MEDIUM,
                    cardListHeight:
                        window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT,
                })
            } else {
                setResponsive({
                    barWidth: RATE_BAR_WIDTH,
                    pictureSize: PICTURE_BOX_SIZE,
                    cardItemHeight: CARD_ITEM_HEIGHT,
                    cardListHeight:
                        window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT,
                })
            }
        }, 150)

        onResizeWindow()

        window.addEventListener('resize', onResizeWindow)
        return () => {
            window.removeEventListener('resize', onResizeWindow)
        }
    }, [])

    return (
        <ResponsiveContext.Provider value={{ ...responsive }}>
            {children}
        </ResponsiveContext.Provider>
    )
}
