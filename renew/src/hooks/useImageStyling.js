import { useEffect, useState } from 'react'
import { PICTURE_BOX_SIZE, PICTURE_BOX_SIZE_MEDIUM } from '../constants'
import { throttle } from 'lodash'
export default function useAvatarSizing(style, saveProfileStyle) {
    const [pictureSize, setPictureSize] = useState(
        innerWidth <= 900 ? PICTURE_BOX_SIZE_MEDIUM : PICTURE_BOX_SIZE,
    )
    const [imgStyle, setStyle] = useState({ ...style })

    const setScaleRate = (value) => {
        setStyle((prev) => ({ ...prev, scale: value }))
    }

    const setRoundedRate = (value) => {
        setStyle((prev) => ({ ...prev, rounded: value }))
    }

    const setTransXRate = (value) => {
        setStyle((prev) => ({ ...prev, transX: value }))
    }

    const setTransYRate = (value) => {
        setStyle((prev) => ({ ...prev, transY: value }))
    }

    const handleSaveStyle = () => {
        saveProfileStyle({
            ...imgStyle,
        })
    }

    useEffect(() => {
        const onResizeWindow = throttle(() => {
            if (innerWidth <= 900) setPictureSize(PICTURE_BOX_SIZE_MEDIUM)
            else setPictureSize(PICTURE_BOX_SIZE)
        }, 150)

        window.addEventListener('resize', onResizeWindow)
        return () => {
            window.removeEventListener('resize', onResizeWindow)
        }
    }, [setPictureSize])

    return {
        imgStyle,
        setScaleRate,
        setRoundedRate,
        setTransXRate,
        setTransYRate,
        handleSaveStyle,
        pictureSize,
    }
}
