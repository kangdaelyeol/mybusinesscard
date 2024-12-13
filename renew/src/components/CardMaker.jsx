import React, { useRef } from 'react'
import { createCard } from '../store/cardsSlice'
import useCardMaker from '../hooks/useCardMaker'

export default function CardMaker() {
    const { state, changeDescription, changeName, changeProfile, changeTheme } =
        useCardMaker()
    const fileInputRef = useRef()
    const handleFileInput = (e) => {
        console.log(fileInputRef.current.files)
    }
    const clickFileInput = () => {
        fileInputRef && fileInputRef.current.click()
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const saveCard = (value) => {
        const cardID = Date.now()
        dispatch(createCard({ card: { ...card, id: cardID } }))
    }

    return (
        <div className="flex flex-1 justify-center items-center h-[230px]">
            <form
                className="flex flex-col gap-[10px] w-[400px]"
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
            >
                <div className="flex w-full gap-[10px]">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="grow rounded-[5px] px-[10px] py-[5px] bg-gray-800 outline-none text-white"
                        value={state.name}
                        onChange={changeName}
                    />
                    <select
                        name="color"
                        id="color"
                        className="rounded-[5px] px-[10px] py-[5px] bg-gray-800 outline-none text-white"
                        value={state.theme}
                        onChange={changeTheme}
                    >
                        <option value="black">black</option>
                        <option value="pink">pink</option>
                    </select>
                </div>

                <textarea
                    className="w-[400px] rounded-[5px] px-[10px] py-[5px] mx-auto resize-none outline-none text-white bg-gray-800"
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
                        onClick={clickFileInput}
                        className="font-bold py-[10px] rounded-[5px] text-white bg-gray-700 select-none hover:bg-gray-600 grow"
                    >
                        file
                    </button>
                    <button className="font-bold px-[15px] py-[10px] rounded-[5px] text-white bg-gray-700 select-none hover:bg-gray-600">
                        save
                    </button>
                </div>
            </form>
        </div>
    )
}
