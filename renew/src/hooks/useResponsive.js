import { useEffect, useState } from 'react'
import {
    PICTURE_BOX_SIZE,
    PICTURE_BOX_SIZE_MEDIUM,
    RATE_BAR_WIDTH,
    RATE_BAR_WIDTH_MEDIUM,
} from '../constants'
import { throttle } from 'lodash'

export default function useResponsive() {
    const [pictureSize, setPictureSize] = useState(
        innerWidth <= 900 ? PICTURE_BOX_SIZE_MEDIUM : PICTURE_BOX_SIZE,
    )

    const [barWidth, setBarWidth] = useState(
        innerWidth <= 900 ? RATE_BAR_WIDTH_MEDIUM : RATE_BAR_WIDTH,
    )

    useEffect(() => {
        const onResizeWindow = throttle(() => {
            if (innerWidth <= 900) {
                setPictureSize(PICTURE_BOX_SIZE_MEDIUM)
                setBarWidth(RATE_BAR_WIDTH_MEDIUM)
            } else {
                setPictureSize(PICTURE_BOX_SIZE)
                setBarWidth(RATE_BAR_WIDTH)
            }
        }, 150)

        window.addEventListener('resize', onResizeWindow)
        return () => {
            window.removeEventListener('resize', onResizeWindow)
        }
    }, [setPictureSize, setBarWidth])

    return {
        pictureSize,
        barWidth,
    }
}
