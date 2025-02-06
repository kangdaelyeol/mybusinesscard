import { useRef, useContext } from 'react'
import classNames from 'classnames'
import { ThemeContext } from '../context'
import LoadingSpinner from './LoadingSpinner'
import useCardEditor from '../hooks/useCardEditor'

export default function CardEditorForm({ card }) {
    const { handlers, fileLoading } = useCardEditor(card)

    const { theme } = useContext(ThemeContext)

    const fileInputRef = useRef()

    const handleFileInputClick = () => {
        if (fileLoading) return
        fileInputRef && fileInputRef.current.click()
    }

    return (
        <div className="flex flex-1 justify-center items-center h-[230px]">
            <div className="flex flex-col w-editor-lg gap-[10px]">
                <div className="flex w-full gap-[10px]">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className={classNames(
                            'grow rounded-[5px] px-[10px] py-[5px] outline-none border-[1px]',
                            {
                                'input-dark': theme === 'dark',
                                'input-light': theme === 'light',
                            },
                        )}
                        value={card.name}
                        onChange={handlers.handleNameChange}
                    />
                    <select
                        name="color"
                        id="color"
                        className={classNames(
                            'rounded-[5px] px-[10px] py-[5px] outline-none border-[1px] cursor-pointer',
                            {
                                'input-dark': theme === 'dark',
                                'input-light': theme === 'light',
                            },
                        )}
                        value={card.theme}
                        onChange={handlers.handleThemeChange}
                    >
                        <option value="black">black</option>
                        <option value="pink">pink</option>
                    </select>
                </div>

                <textarea
                    className={classNames(
                        'w-full rounded-[5px] px-[10px] py-[5px] mx-auto resize-none outline-none border-[1px]',
                        {
                            'input-dark': theme === 'dark',
                            'input-light': theme === 'light',
                        },
                    )}
                    name="description"
                    id="description"
                    rows="3"
                    placeholder="description"
                    value={card.description}
                    onChange={handlers.handleDescriptionChange}
                ></textarea>

                <div className="flex w-full gap-[10px]">
                    <input
                        onChange={handlers.handleProfileChange}
                        accept="image/*"
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                    />
                    <button
                        onClick={handleFileInputClick}
                        className={classNames(
                            'font-bold py-[10px] rounded-[5px] select-none grow transition-all border-[1px]',
                            {
                                'btn-light': theme === 'light',
                                'btn-dark': theme === 'dark',
                            },
                        )}
                    >
                        {fileLoading ? <LoadingSpinner /> : 'File'}
                    </button>
                    <button
                        onClick={handlers.handleCardDelete}
                        className={classNames(
                            'font-bold px-[15px] py-[10px] rounded-[5px] text-white select-none border-[1px] transition-all',
                            {
                                'btn-light': theme === 'light',
                                'btn-dark': theme === 'dark',
                            },
                        )}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
