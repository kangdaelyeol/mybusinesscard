import React, { useContext } from 'react'
import classNames from 'classnames'
import { CardContext } from '../context/CardContext'
import { DEFAULT_CARD_PROFILE } from '../constants'
import { ThemeContext } from '../context/ThemeContext'

export default function CardDisplay({ card }) {
    let data
    if (!card) data = useContext(CardContext).state
    else data = card
    const descriptionList = data.description.split('\n')

    const { theme } = useContext(ThemeContext)

    const onImgLoad = (e) => {
        console.log(e.target.naturalHeight, e.target.naturalWidth)
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
                <div className="avatar w-[120px] h-[120px] relative rounded-[50%] overflow-hidden">
                    <img
                        alt="avatar"
                        src={data.profile.url || DEFAULT_CARD_PROFILE}
                        className="max-w-none cursor-pointer w-[var(--img-width)] h-[var(--img-width)]"
                        onLoad={onImgLoad}
                        style={{
                            '--img-width': '120px',
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
        </div>
    )
}
