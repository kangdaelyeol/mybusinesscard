import React, { useContext } from 'react'
import classNames from 'classnames'
import { CardContext } from '../context/CardContext'
import { DEFAULT_CARD_PROFILE } from '../constants'

export default function CardDisplay({ card }) {
    let data
    if (!card) data = useContext(CardContext).state
    else data = card
    const descriptionList = data.description.split('\n')
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
                <img
                    alt="avatar"
                    src={data.profile.url || DEFAULT_CARD_PROFILE}
                    className="rounded-[50%] w-[120px] h-[120px]"
                />
                <div>
                    <div className="text-[25px] select-none">
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
