import React, { useContext, useRef, useState } from 'react'
import AvatarSizing from './AvatarSizing'
import { UserContext } from '../context/UserContext'
import ImgDisplay from './ImgDisplay'
import { uploadCloudinaryImage } from '../api'
import LoadingSpinner from './LoadingSpinner'
import { USER_ACTIONS } from '../reducer/userReducer'

const PROFILE_DETAIL_IMG_SIZE = 100

export default function ProfileDetail() {
    const { userState, userDispatch } = useContext(UserContext)
    const [avatarSizing, setAvatarSizing] = useState(false)
    const [avatarOption, setAvatarOption] = useState(false)
    const [fileLoading, setFileLoading] = useState(false)

    const fileInputRef = useRef()

    const saveProfileStyle = (style) => {
        userDispatch({
            type: USER_ACTIONS.UPDATE_PROFILE_STYLE,
            payload: { style },
        })
        setAvatarSizing(false)
        setAvatarOption(false)
    }

    const handleEditPositionClick = () => {
        setAvatarSizing(true)
    }

    const handleEditProfileClick = () => {
        setAvatarOption((prev) => !prev)
    }

    const handleFileInput = async (e) => {
        setFileLoading(true)
        const res = await uploadCloudinaryImage(e.target.files[0])

        if (res.status !== 200) {
            console.log(res.message)
            setFileLoading(false)
            return
        }

        const { url, asset_id, signature, public_id, width, height } = res.data

        const profile = {
            url,
            assetId: asset_id,
            signature,
            publicId: public_id,
            style: {
                scale: 1,
                transX: 0,
                transY: 0,
                rounded: 50,
                width,
                height,
            },
        }

        userDispatch({
            type: USER_ACTIONS.UPDATE_PROFILE,
            payload: { profile },
        })

        setFileLoading(false)
        setAvatarSizing(true)
    }

    const handleNewFileClick = () => {
        fileInputRef.current.click()
    }

    return (
        <div className="absolute flex flex-col gap-[10px] items-center bg-color-black-light top-[var(--header-height)] right-0 rounded-[30px] w-[400px] mr-[10px] mt-[10px] p-[15px]">
            <div className="relative">
                <ImgDisplay
                    size={PROFILE_DETAIL_IMG_SIZE}
                    profile={userState.profile}
                />
                <div
                    className="absolute bottom-[-8px] right-[-8px] flex justify-center items-center w-[30px] h-[30px] bg-color-black rounded-[50%] cursor-pointer hover:bg-color-black-bright"
                    onClick={handleEditProfileClick}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        edit
                    </span>
                </div>
                {avatarOption && (
                    <div className="flex flex-col absolute bottom-[-8px] right-[-110px] bg-color-black w-[100px] rounded-[10px] overflow-hidden">
                        <div
                            onClick={handleNewFileClick}
                            className="text-center py-[5px] cursor-pointer hover:bg-color-black-bright"
                        >
                            {fileLoading ? <LoadingSpinner /> : 'New File'}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onInput={handleFileInput}
                        />
                        <div
                            className="text-center py-[5px] cursor-pointer hover:bg-color-black-bright"
                            onClick={handleEditPositionClick}
                        >
                            Position
                        </div>
                    </div>
                )}
            </div>
            <div className="text-center text-[24px] font-lightbold">
                안녕하세요, {userState.username}님
            </div>

            <div className="py-[7px] w-[150px] font-bold text-center border-solid border-[1px] border-color-white rounded-[9999px] cursor-pointer text-color-skyblue hover:bg-color-black-bright">
                계정 관리
            </div>

            <div className="py-[10px] w-[300px] text-center bg-color-black cursor-pointer hover:bg-color-black-bright rounded-[8px]">
                로그아웃
            </div>

            <div className="flex gap-[5px]  items-center">
                <div className="px-[5px] py-[3px] text-[12px] cursor-pointer hover:bg-color-black-bright">
                    개인정보처리방침
                </div>
                <div className="w-[3px] h-[3px] rounded-[50%] bg-color-gray"></div>
                <div className="px-[5px] py-[3px] text-[12px] cursor-pointer hover:bg-color-black-bright">
                    서비스 약관
                </div>
            </div>

            {avatarSizing && (
                <AvatarSizing
                    {...userState.profile}
                    saveProfileStyle={saveProfileStyle}
                />
            )}
        </div>
    )
}
