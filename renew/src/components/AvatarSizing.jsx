import ControlBar from './ControlBar'
import {
    PICTURE_BOX_SIZE,
    MAX_SCALE_VALUE,
    DEFAULT_PROFILE,
} from '../constants'
import useAvatarSizing from '../hooks/useAvatarSizing'
import calculateImageSize from '../utils/calculateImageSize'

export default function AvatarSizing({ url, style, saveProfileStyle }) {
    const {
        imgStyle,
        setScaleRate,
        setRoundedRate,
        setTransXRate,
        setTransYRate,
        handleSaveStyle,
    } = useAvatarSizing(style, saveProfileStyle)

    const { width, height, scale, rounded, transX, transY } = imgStyle

    const { newHeight, newWidth, minTransX, minTransY } = calculateImageSize(
        width,
        height,
        PICTURE_BOX_SIZE,
    )

    const controlBarOptionList = [
        {
            title: 'Scale',
            setRate: setScaleRate,
            minVal: 1,
            maxVal: MAX_SCALE_VALUE,
            value: scale,
        },
        {
            title: 'TranslateX',
            setRate: setTransXRate,
            minVal: 0,
            maxVal: 100 * scale - 100 + minTransX,
            value: transX,
        },
        {
            title: 'TranslateY',
            setRate: setTransYRate,
            minVal: 0,
            maxVal: 100 * scale - 100 + minTransY,
            value: transY,
        },
        {
            title: 'Round',
            setRate: setRoundedRate,
            minVal: 0,
            maxVal: 50,
            value: rounded,
        },
    ]

    return (
        <div className="bg-picture-edit w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center backdrop-blur-sm z-10">
            <div className="bg-color-light flex flex-col">
                <div className="text-[30px] font-bold text-color-white text-center mb-[20px]">
                    Set your picture display!
                </div>
                <div className="flex gap-[30px]">
                    <div
                        className="relative w-[var(--img-size)] h-[var(--img-size)] overflow-hidden border-[5px] border-gray-900 border-solid"
                        style={{
                            '--img-size': `${PICTURE_BOX_SIZE}px`,
                        }}
                    >
                        <img
                            className="absolute filter scale-[var(--img-scale)] origin-top-left translate-x-[var(--img-translateX)] translate-y-[var(--img-translateY)]"
                            src={url || DEFAULT_PROFILE}
                            alt="resized picture"
                            width={newWidth}
                            height={newHeight}
                            style={{
                                '--img-scale': scale,
                                '--img-translateX': `-${transX}%`,
                                '--img-translateY': `-${transY}%`,
                            }}
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-full rounded-[var(--picture-rounded)] overflow-hidden"
                            style={{
                                '--picture-rounded': `${rounded}%`,
                            }}
                        >
                            <img
                                className="absolute scale-[var(--img-scale)] translate-x-[var(--img-translateX)] translate-y-[var(--img-translateY)] origin-top-left"
                                src={url || DEFAULT_PROFILE}
                                alt="resized picture"
                                width={newWidth}
                                height={newHeight}
                                style={{
                                    '--img-scale': scale,
                                    '--img-translateX': `-${transX}%`,
                                    '--img-translateY': `-${transY}%`,
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col h-[400px] w-[400px]">
                        {controlBarOptionList.map((option) => (
                            <ControlBar key={option.title} {...option} />
                        ))}

                        <button
                            onClick={handleSaveStyle}
                            className="btn-light p-[10px] mt-[20px]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
