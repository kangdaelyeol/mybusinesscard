import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import { RATE_BAR_WIDTH } from '../constants'

export default function ControllBar({ setRate, title, minVal, maxVal, value }) {
    let barRate = (value - minVal) / (maxVal - minVal)
    let isDisable = false

    if (isNaN(barRate)) {
        barRate = minVal
        isDisable = true
    }

    useEffect(() => {
        const rate =
            minVal + ((maxVal - minVal) * (value - minVal)) / (maxVal - minVal)

        if (rate >= maxVal) setRate(maxVal)
        else if (rate < minVal) setRate(minVal)
        else if (minVal === maxVal) setRate(minVal)
        else setRate(rate)
    }, [maxVal])

    const [mouseDown, setMouseDown] = useState(false)

    const handleBarMove = (e) => {
        if (!mouseDown) return

        const rate =
            (maxVal - minVal) * (e.nativeEvent.offsetX / RATE_BAR_WIDTH) +
            minVal

        setRate(rate)
    }

    const handleMouseDown = () => {
        setMouseDown(true)
    }

    const handleMouseClear = () => {
        setMouseDown(false)
    }
    return (
        <div className="relative mb-[30px]">
            <div className="text-color-white mb-[15px] font-bold text-[20px]">
                {title}
            </div>
            <div
                className={classNames(
                    'absolute w-full h-[10px] my-auto border-1px border-solid border-color-black box-border',
                    {
                        'bg-color-white': isDisable === false,
                        'bg-gray-900': isDisable === true,
                    },
                )}
            >
                {!isDisable && (
                    <>
                        <div
                            className="h-[200%] w-[20px] absolute top-[-50%] left-[var(--controller-x)] rounded-[50%] bg-color-blue"
                            style={{
                                '--controller-x': `${
                                    barRate * RATE_BAR_WIDTH - 10
                                }px`,
                            }}
                        ></div>
                        <div
                            className="absolute h-full top-0 left-0 w-[var(--bar-width)] bg-color-blue"
                            style={{
                                '--bar-width': `${barRate * RATE_BAR_WIDTH}px`,
                            }}
                        ></div>
                    </>
                )}

                <div
                    onMouseMove={handleBarMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseClear}
                    onMouseLeave={handleMouseClear}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer"
                ></div>
            </div>
        </div>
    )
}
