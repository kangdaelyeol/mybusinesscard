import React, { useContext, useRef } from 'react'
import useCardEditor from '../hooks/useCardEditor'
import classNames from 'classnames'
import { ThemeContext } from '../context/ThemeContext'
export default function CardEditor({ id, name, description, theme }) {
    const {
        handleNameChange,
        handleDescriptionChange,
        handleThemeChange,
        handleCardDelete,
        handleFileInput,
        fileLoading,
    } = useCardEditor()

    const { theme: themeMode } = useContext(ThemeContext)

    const fileInputRef = useRef()

    const handleFileInputClick = () => {
        if (fileLoading) return
        fileInputRef && fileInputRef.current.click()
    }

    return (
        <div className="flex flex-1 justify-center items-center h-[230px]">
            <div className="w-editor-lg flex flex-col gap-[10px]">
                <div className="flex w-full gap-[10px]">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className={classNames(
                            'grow rounded-[5px] px-[10px] py-[5px] outline-none border-[1px]',
                            {
                                'input-dark': themeMode === 'dark',
                                'input-light': themeMode === 'light',
                            },
                        )}
                        value={name}
                        onChange={(e) => handleNameChange(e, id)}
                    />
                    <select
                        name="color"
                        id="color"
                        className={classNames(
                            'rounded-[5px] px-[10px] py-[5px] outline-none border-[1px]',
                            {
                                'input-dark': themeMode === 'dark',
                                'input-light': themeMode === 'light',
                            },
                        )}
                        onChange={(e) => handleThemeChange(e, id)}
                        value={theme}
                    >
                        <option value="black">black</option>
                        <option value="pink">pink</option>
                    </select>
                </div>

                <textarea
                    className={classNames(
                        'w-full rounded-[5px] px-[10px] py-[5px] mx-auto resize-none outline-none border-[1px]',
                        {
                            'input-dark': themeMode === 'dark',
                            'input-light': themeMode === 'light',
                        },
                    )}
                    name="description"
                    id="description"
                    rows="3"
                    placeholder="description"
                    value={description}
                    onChange={(e) => handleDescriptionChange(e, id)}
                ></textarea>

                <div className="flex w-full gap-[10px]">
                    <input
                        onChange={(e) => handleFileInput(e, id)}
                        accept="image/*"
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                    />
                    <button
                        onClick={(e) => handleFileInputClick(e, id)}
                        className={classNames(
                            'grow font-bold py-[10px] rounded-[5px] select-none border-[1px] transition-all',
                            {
                                'btn-dark': themeMode === 'dark',
                                'btn-light': themeMode === 'light',
                            },
                        )}
                    >
                        {fileLoading ? (
                            <div className="flex justify-center gap-[5px]">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 border-text-white border-[3px] border-t-transparent rounded-[50%]"
                                    viewBox="0 0 24 24"
                                ></svg>
                                Processing...
                            </div>
                        ) : (
                            'file'
                        )}
                    </button>
                    <button
                        onClick={(e) => handleCardDelete(e, id)}
                        className={classNames(
                            'font-bold px-[15px] py-[10px] rounded-[5px] select-none border-[1px] transition-all',
                            {
                                'btn-dark': themeMode === 'dark',
                                'btn-light': themeMode === 'light',
                            },
                        )}
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}
