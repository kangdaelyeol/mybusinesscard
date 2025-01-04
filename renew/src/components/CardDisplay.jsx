import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { CardContext } from '../context/CardContext'
import { ThemeContext } from '../context/ThemeContext'
import AvatarSizing from './AvatarSizing'
import { CARD_ACTIONS } from '../reducer'
import { useDispatch } from 'react-redux'
import { updateCardProfileStyle } from '../store/cardsSlice'
import { CARD_IMAGE_SIZE } from '../constants'

export default function CardDisplay({ card }) {
    let data, saveProfileStyle
    const [editPicture, setEditPicture] = useState(false)

    if (!card) {
        const { state, dispatch } = useContext(CardContext)
        data = state
        saveProfileStyle = (style) => {
            dispatch({
                type: CARD_ACTIONS.UPDATE_PROFILE_STYLE,
                payload: { style },
            })
            setEditPicture(false)
        }
    } else {
        data = card
        const dispatch = useDispatch()
        saveProfileStyle = (style) => {
            dispatch(updateCardProfileStyle({ id: data.id, value: style }))
            setEditPicture(false)
        }
    }

    const descriptionList = data.description.split('\n')

    const handlePictureEdit = () => {
        setEditPicture(true)
    }

    const { theme } = useContext(ThemeContext)

    const { width, height, transX, transY, scale, rounded } = data.profile.style

    let newImgWidth, newImgHeight

    const widthRate = width / height

    if (widthRate >= 1) {
        ;[newImgWidth, newImgHeight] = [
            CARD_IMAGE_SIZE * widthRate,
            CARD_IMAGE_SIZE,
        ]
    } else {
        ;[newImgWidth, newImgHeight] = [
            CARD_IMAGE_SIZE,
            CARD_IMAGE_SIZE / widthRate,
        ]
    }

    return (
        <div className="h-[230px] flex flex-1">
            <div
                className={classNames(
                    'w-[440px] m-auto flex gap-[20px] rounded-[20px] border-[3px] border-solid p-[35px] overflow-hidden',
                    {
                        'bg-theme-pink border-pink-300 text-white':
                            data.theme === 'pink',
                        'bg-theme-black border-black text-gray-200':
                            data.theme === 'black',
                    },
                )}
            >
                <div
                    className="avatar w-[var(--img-size)] h-[var(--img-size)] relative rounded-[var(--img-rounded)] overflow-hidden"
                    style={{
                        '--img-rounded': `${rounded}%`,
                        '--img-size': `${CARD_IMAGE_SIZE}px`,
                    }}
                >
                    <img
                        alt="avatar"
                        src={data.profile.url}
                        className="max-w-none cursor-pointer scale-[var(--img-scale)] origin-top-left translate-x-[var(--img-transX)] translate-y-[var(--img-transY)]"
                        width={newImgWidth}
                        height={newImgHeight}
                        style={{
                            '--img-transX': `-${transX}%`,
                            '--img-transY': `-${transY}%`,
                            '--img-scale': scale,
                        }}
                    />
                    <div
                        className={classNames(
                            'avatar-edit w-full h-full absolute top-0 left-0 transition-all flex justify-center items-center object-',
                            {
                                'btn-light': theme === 'light',
                                'btn-dark': theme === 'dark',
                            },
                        )}
                        onClick={handlePictureEdit}
                    >
                        Edit
                    </div>
                </div>
                <div>
                    <div className="text-[25px] select-none object-cover">
                        {data.name || 'Name'}
                    </div>
                    {descriptionList.length === 0 && descriptionList[0] === ''
                        ? 'Description'
                        : descriptionList.map((content, idx) => (
                              <p
                                  key={idx}
                                  className="select-none whitespace-pre-wrap"
                              >
                                  {content}
                              </p>
                          ))}
                </div>
            </div>
            {editPicture && (
                <AvatarSizing
                    {...data.profile}
                    saveProfileStyle={saveProfileStyle}
                />
            )}
        </div>
    )
}
