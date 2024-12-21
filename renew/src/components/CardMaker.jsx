import React, { useRef } from 'react'
import useCardMaker from '../hooks/useCardMaker'

export default function CardMaker() {
    const {
        state,
        changeDescription,
        changeName,
        changeTheme,
        handleFileInput,
        saveCard,
        fileLoading,
    } = useCardMaker()
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
                        className="input-black grow rounded-[5px] px-[10px] py-[5px] outline-none border-[1px]"
                        value={state.name}
                        onChange={changeName}
                    />
                    <select
                        name="color"
                        id="color"
                        className="input-black rounded-[5px] px-[10px] py-[5px] outline-none border-[1px]"
                        value={state.theme}
                        onChange={changeTheme}
                    >
                        <option value="black">black</option>
                        <option value="pink">pink</option>
                    </select>
                </div>

                <textarea
                    className="input-black w-full rounded-[5px] px-[10px] py-[5px] mx-auto resize-none outline-none border-[1px]"
                    name="description"
                    id="description"
                    rows="3"
                    placeholder="description"
                    value={state.description}
                    onChange={changeDescription}
                ></textarea>

                <div className="flex w-full gap-[10px]">
                    <input
                        onChange={handleFileInput}
                        accept="image/*"
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                    />
                    <button
                        onClick={handleFileInputClick}
                        className="btn-black font-bold py-[10px] rounded-[5px] select-none grow transition-all border-[1px]"
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
                        onClick={saveCard}
                        className="btn-black font-bold px-[15px] py-[10px] rounded-[5px] text-white select-none border-[1px] transition-all"
                    >
                        save
                    </button>
                </div>
            </div>
        </div>
    )
}
