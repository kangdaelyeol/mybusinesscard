import { useState } from 'react'

export default function useAvatarSizing(style, saveProfileStyle) {
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

    return {
        imgStyle,
        setScaleRate,
        setRoundedRate,
        setTransXRate,
        setTransYRate,
        handleSaveStyle,
    }
}
