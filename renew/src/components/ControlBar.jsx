import classNames from 'classnames'
import { RATE_BAR_WIDTH } from '../constants'
import useControlbar from '../hooks/useControlBar'

export default function ControllBar({ setRate, title, minVal, maxVal, value }) {
    const {
        handleBarMove,
        handleMouseClear,
        handleMouseDown,
        barRate,
        isDisable,
    } = useControlbar(minVal, maxVal, setRate, value, RATE_BAR_WIDTH)

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
