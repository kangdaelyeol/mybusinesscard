import React from 'react'

export default function ProfileDetail({ user }) {
    return (
        <div className="absolute bg-gray-800 top-[var(--header-height)] right-0 rounded-[30px] w-[400px] mr-[10px] mt-[10px] p-[15px]">
            <div className="text-center mt-[20px] text-[24px] font-lightbold">
                안녕하세요 {user.username}님
            </div>
        </div>
    )
}
