import React from 'react'

export default function Header() {
    const isLogin = true

    return (
        <header className="bg-header-black fixed w-[100%]">
            <div className="max-w-[1100px] relative mx-auto h-[100px] flex">
                {isLogin && (
                    <div>
                        <img
                            alt="profile"
                            className="absolute inset-y-0 my-auto left-[20px] h-[50px] w-[50px] rounded-[50%] ml-[15px]"
                            src="https://avatars.githubusercontent.com/u/27201345?v=4"
                        ></img>
                    </div>
                )}

                <span className="inset-0 m-auto text-white font-medium text-[1.8rem]">
                    Create Business Card
                </span>

                {isLogin && (
                    <div className="btn-black absolute h-[40px] leading-[40px] px-[10px] right-[20px] top-0 bottom-0 my-auto text-[1rem] font-bold border-[1px] rounded-[5px] cursor-pointer transition-all">
                        logout
                    </div>
                )}
            </div>
        </header>
    )
}
