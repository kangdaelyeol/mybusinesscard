import React, { useContext, useState } from 'react'
import AvatarSizing from './AvatarSizing'
import { UserContext } from '../context/UserContext'
import ImgDisplay from './ImgDisplay'

const PROFILE_DETAIL_IMG_SIZE = 100

export default function ProfileDetail() {
    const { user, setUser } = useContext(UserContext)
    const [avatarSizing, setAvatarSizing] = useState(false)

    const saveProfileStyle = (style) => {
        setUser((prev) => ({ ...prev, profile: { ...prev.profile, style } }))
        setAvatarSizing(false)
    }

    const handleProfileClick = () => {
        setAvatarSizing(true)
    }

    return (
        <div className="absolute flex flex-col items-center bg-color-black-light top-[var(--header-height)] right-0 rounded-[30px] w-[400px] mr-[10px] mt-[10px] p-[15px]">
            <div className="" onClick={handleProfileClick}>
                <ImgDisplay
                    size={PROFILE_DETAIL_IMG_SIZE}
                    profile={user.profile}
                />
            </div>
            <div className="text-center mt-[20px] text-[24px] font-lightbold">
                안녕하세요, {user.username}님
            </div>

            <div className="py-[7px] w-[150px] mt-[15px] font-bold text-center border-solid border-[1px] border-color-white rounded-[9999px] cursor-pointer text-color-skyblue hover:bg-color-black-bright">
                계정 관리
            </div>

            <div className="py-[10px] w-[300px] mt-[10px] text-center bg-color-black cursor-pointer hover:bg-color-black-bright rounded-[8px]">
                로그아웃
            </div>

            <div className="flex gap-[5px] mt-[12px] items-center">
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
                    {...user.profile}
                    saveProfileStyle={saveProfileStyle}
                />
            )}
        </div>
    )
}
