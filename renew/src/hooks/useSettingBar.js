import { useState, useEffect } from 'react'
import { RATE_BAR_WIDTH, RATE_BAR_WIDTH_MEDIUM } from '../constants'
import { throttle } from 'lodash'
export default function useSettingBar(minVal, maxVal, setRate, value) {
    useEffect(() => {
        const rate =
            minVal + ((maxVal - minVal) * (value - minVal)) / (maxVal - minVal)

        if (rate >= maxVal) setRate(maxVal)
        else if (rate < minVal) setRate(minVal)
        else if (minVal === maxVal) setRate(minVal)
        else setRate(rate)
    }, [maxVal])

    const [mouseDown, setMouseDown] = useState(false)

    const [barWidth, setBarWidth] = useState(
        innerWidth <= 900 ? RATE_BAR_WIDTH_MEDIUM : RATE_BAR_WIDTH,
    )

    useEffect(() => {
        const onResizeWindow = throttle(() => {
            if (innerWidth <= 900) {
                setBarWidth(RATE_BAR_WIDTH_MEDIUM)
            } else {
                setBarWidth(RATE_BAR_WIDTH)
            }
        }, 150)

        window.addEventListener('resize', onResizeWindow)

        return () => {
            window.removeEventListener('resize', onResizeWindow)
        }
    }, [setBarWidth])

    const handleBarMove = (e) => {
        if (!mouseDown) return
        const rate =
            (maxVal - minVal) * (e.nativeEvent.offsetX / barWidth) + minVal

        setRate(rate)
    }

    const handleMouseDown = () => {
        setMouseDown(true)
    }

    const handleMouseClear = () => {
        setMouseDown(false)
    }

    let barRate = (value - minVal) / (maxVal - minVal)
    let isDisable = false

    if (isNaN(barRate)) {
        barRate = minVal
        isDisable = true
    }

    return {
        handleBarMove,
        handleMouseClear,
        handleMouseDown,
        barRate,
        isDisable,
        barWidth,
    }
}
