import React, { useRef } from 'react'
import useCardEditor from '../hooks/useCardEditor'

export default function CardEditor({ id, name, description, theme }) {
    const {
        handleNameChange,
        handleDescriptionChange,
        handleThemeChange,
        handleCardDelete,
    } = useCardEditor()

    const fileInputRef = useRef()

    const handleFileInput = (e) => {
        console.log(fileInputRef.current.files)
    }

    const clickFileInput = () => {
        fileInputRef && fileInputRef.current.click()
    }

    const handleFormSubmit = (e, id) => {
        e.preventDefault()
    }

    return (
        <div className="flex flex-1 justify-center items-center h-[230px]">
            <form
                className="flex flex-col gap-[10px] w-[400px]"
                encType="multipart/form-data"
                onSubmit={(e) => handleFormSubmit(e, id)}
            >
                <div className="flex w-full gap-[10px]">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="grow rounded-[5px] px-[10px] py-[5px] bg-gray-800 outline-none text-white"
                        value={name}
                        onChange={(e) => handleNameChange(e, id)}
                    />
                    <select
                        name="color"
                        id="color"
                        className="rounded-[5px] px-[10px] py-[5px] bg-gray-800 outline-none text-white"
                        onChange={(e) => handleThemeChange(e, id)}
                        value={theme}
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
                        onClick={(e) => clickFileInput(e, id)}
                        className="font-bold py-[10px] rounded-[5px] text-white bg-gray-700 select-none hover:bg-gray-600 grow"
                    >
                        file
                    </button>
                    <button
                        onClick={(e) => handleCardDelete(e, id)}
                        className="font-bold px-[15px] py-[10px] rounded-[5px] text-white bg-gray-700 select-none hover:bg-gray-600"
                    >
                        delete
                    </button>
                </div>
            </form>
        </div>
    )
}
