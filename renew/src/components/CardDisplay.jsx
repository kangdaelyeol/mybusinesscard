import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { CardContext } from '../context/CardContext'
import AvatarSizing from './AvatarSizing'
import { CARD_ACTIONS } from '../reducer'
import { useDispatch } from 'react-redux'
import { updateCardProfileStyle } from '../store/cardsSlice'
import { CARD_IMAGE_SIZE } from '../constants'
import ImgDisplay from './ImgDisplay'

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
                <div className="relative" onClick={handlePictureEdit}>
                    <ImgDisplay size={CARD_IMAGE_SIZE} profile={data.profile} />
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
