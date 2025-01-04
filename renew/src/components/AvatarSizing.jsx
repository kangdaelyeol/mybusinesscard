import React, { useState } from 'react'
import ControllBar from './ControllBar'

export default function AvatarSizing({ url, style, saveProfileStyle }) {
    const PICTURE_BOX_SIZE = 400

    const MIN_SCALE_VALUE = 1
    const MAX_SCALE_VALUE = 5

    const [scaleRate, setScaleRate] = useState(style.scale)

    const [translateXRate, setTranslateXRate] = useState(style.transX)

    const [translateYRate, setTranslateYRate] = useState(style.transY)

    const [roundRate, setRoundRate] = useState(style.rounded)

    const widthRate = style.width / style.height

    let newHeight, newWidth, minTransX, minTransY

    if (widthRate >= 1) {
        ;[newWidth, newHeight] = [
            widthRate * PICTURE_BOX_SIZE,
            PICTURE_BOX_SIZE,
        ]
        ;[minTransX, minTransY] = [
            ((newWidth - PICTURE_BOX_SIZE) / newWidth) * 100,
            0,
        ]
    } else {
        ;[newWidth, newHeight] = [
            PICTURE_BOX_SIZE,
            PICTURE_BOX_SIZE / widthRate,
        ]
        ;[minTransX, minTransY] = [
            0,
            ((newHeight - PICTURE_BOX_SIZE) / newHeight) * 100,
        ]
    }

    const handleSaveStyle = () => {
        saveProfileStyle({
            scale: scaleRate,
            transX: translateXRate,
            transY: translateYRate,
            rounded: roundRate,
        })
    }

    return (
        <div className="bg-picture-edit w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center backdrop-blur-sm z-10">
            <div className="bg-color-light flex flex-col">
                <div className="text-[30px] font-bold text-color-white text-center mb-[20px]">
                    Set your picture display!
                </div>
                <div className="flex gap-[30px]">
                    <div className="h-[400px] w-[400px] relative overflow-hidden border-[5px] border-gray-900 border-solid">
                        <img
                            className="absolute filter scale-[var(--img-scale)] origin-top-left translate-x-[var(--img-translateX)] translate-y-[var(--img-translateY)]"
                            src={url}
                            alt="resized picture"
                            width={newWidth}
                            height={newHeight}
                            style={{
                                '--img-scale': scaleRate,
                                '--img-translateX': `-${translateXRate}%`,
                                '--img-translateY': `-${translateYRate}%`,
                            }}
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-full rounded-[var(--picture-rounded)] overflow-hidden"
                            style={{
                                '--picture-rounded': `${roundRate}%`,
                            }}
                        >
                            <img
                                className="absolute scale-[var(--img-scale)] translate-x-[var(--img-translateX)] translate-y-[var(--img-translateY)] origin-top-left"
                                src={url}
                                alt="resized picture"
                                width={newWidth}
                                height={newHeight}
                                style={{
                                    '--img-scale': scaleRate,
                                    '--img-translateX': `-${translateXRate}%`,
                                    '--img-translateY': `-${translateYRate}%`,
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col h-[400px] w-[400px]">
                        <ControllBar
                            title="Scale"
                            setRate={setScaleRate}
                            minVal={MIN_SCALE_VALUE}
                            maxVal={MAX_SCALE_VALUE}
                            currentValue={scaleRate}
                        />
                        <ControllBar
                            title="TranslateX"
                            setRate={setTranslateXRate}
                            minVal={0}
                            maxVal={100 * scaleRate - 100 + minTransX}
                            currentValue={translateXRate}
                        />

                        <ControllBar
                            title="TranslateY"
                            setRate={setTranslateYRate}
                            minVal={0}
                            maxVal={100 * scaleRate - 100 + minTransY}
                            currentValue={translateYRate}
                        />

                        <ControllBar
                            title="Round"
                            setRate={setRoundRate}
                            minVal={0}
                            maxVal={50}
                            currentValue={roundRate}
                        />

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
