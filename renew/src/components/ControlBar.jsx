import classNames from 'classnames'
import useSettingBar from '../hooks/useSettingBar'
import { RATE_BAR_WIDTH, RATE_BAR_WIDTH_MEDIUM } from '../constants'

export default function ControlBar({ setRate, title, minVal, maxVal, value }) {
    const {
        handleBarMove,
        handleMouseClear,
        handleMouseDown,
        barRate,
        isDisable,
        barWidth,
    } = useSettingBar(minVal, maxVal, setRate, value)

    return (
        <div className="relative mb-[30px] max-medium:mb-[20px]">
            <div className="text-color-white mb-[15px] font-bold text-[20px] max-medium:text-[15px] max-medium:mb-[8px]">
                {title}
            </div>
            <div
                className={classNames(
                    'absolute w-[var(--bar-width)] max-medium:w-[var(--bar-width-md)] h-[10px] my-auto border-1px border-solid border-color-black box-border',
                    {
                        'bg-color-white': isDisable === false,
                        'bg-gray-900': isDisable === true,
                    },
                )}
                style={{
                    '--bar-width': `${RATE_BAR_WIDTH}px`,
                    '--bar-width-md': `${RATE_BAR_WIDTH_MEDIUM}px`,
                }}
            >
                {!isDisable && (
                    <>
                        <div
                            className="h-[200%] w-[20px] absolute top-[-50%] left-[var(--controller-x)] rounded-[50%] bg-color-blue"
                            style={{
                                '--controller-x': `${
                                    barRate * barWidth - 10
                                }px`,
                            }}
                        ></div>
                        <div
                            className="absolute h-full top-0 left-0 w-[var(--bar-width)] bg-color-blue"
                            style={{
                                '--bar-width': `${barRate * barWidth}px`,
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
