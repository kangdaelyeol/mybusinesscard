import AvatarSizing from './AvatarSizing'
import ImgDisplay from './ImgDisplay'
import LoadingSpinner from './LoadingSpinner'
import useProfileDetail from '../hooks/useProfileDetail'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import classNames from 'classnames'

const PROFILE_DETAIL_IMG_SIZE = 100

export default function ProfileDetail({ handleLogoutClick }) {
    const {
        fileInputRef,
        handleNewFileClick,
        saveProfileStyle,
        handleEditPositionClick,
        handleEditProfileClick,
        handleFileInput,
        userState,
        avatarSizing,
        avatarOption,
        fileLoading,
    } = useProfileDetail()

    const { theme } = useContext(ThemeContext)

    console.log(theme)
    return (
        <div
            className={classNames(
                'absolute flex flex-col gap-[10px] items-center top-[var(--header-height)] right-0 rounded-[30px] w-[400px] mr-[10px] mt-[10px] p-[15px]',
                {
                    'bg-color-black-light': theme === 'dark',
                    'bg-color-white shadow-2xl': theme === 'light',
                },
            )}
        >
            <div className="relative">
                <ImgDisplay
                    size={PROFILE_DETAIL_IMG_SIZE}
                    profile={userState.profile}
                />
                <div
                    className={classNames(
                        'absolute bottom-[-8px] right-[-8px] flex justify-center items-center w-[30px] h-[30px] rounded-[50%] cursor-pointer',
                        {
                            'bg-color-black hover:bg-color-black-bright':
                                theme === 'dark',
                            'bg-color-blue hover:bg-color-blue-light text-color-white':
                                theme === 'light',
                        },
                    )}
                    onClick={handleEditProfileClick}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        edit
                    </span>
                </div>
                {avatarOption && (
                    <div
                        className={classNames(
                            'flex flex-col absolute bottom-[-8px] right-[-110px] w-[100px] rounded-[10px] overflow-hidden font-semibold',
                            {
                                'bg-color-black': theme === 'dark',
                                'bg-color-white-light shadow-2xl':
                                    theme === 'light',
                            },
                        )}
                    >
                        <div
                            onClick={handleNewFileClick}
                            className={classNames(
                                'text-center py-[5px] cursor-pointer',
                                {
                                    'hover:bg-color-black-bright':
                                        theme === 'dark',
                                    'hover:bg-color-gray-light':
                                        theme === 'light',
                                },
                            )}
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
                            className={classNames(
                                'text-center py-[5px] cursor-pointer',
                                {
                                    'hover:bg-color-black-bright':
                                        theme === 'dark',
                                    'hover:bg-color-gray-light':
                                        theme === 'light',
                                },
                            )}
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

            <div
                className={classNames(
                    'py-[7px] w-[150px] font-bold text-center border-solid border-[1px] rounded-[9999px] cursor-pointer',
                    {
                        'text-color-skyblue hover:bg-color-black-bright border-color-white':
                            theme === 'dark',
                        'text-color-white bg-color-blue hover:bg-color-blue-light border-color-blue-light':
                            theme === 'light',
                    },
                )}
            >
                계정 관리
            </div>

            <div
                onClick={handleLogoutClick}
                className={classNames(
                    'py-[10px] w-[300px] font-bold text-center cursor-pointer rounded-[8px]',
                    {
                        'bg-color-black hover:bg-color-black-bright':
                            theme === 'dark',
                        'bg-color-black-light hover:bg-color-black-bright text-color-white':
                            theme === 'light',
                    },
                )}
            >
                로그아웃
            </div>

            <div className="flex gap-[5px] items-center">
                <div
                    className={classNames(
                        'rounded-[5px] px-[5px] py-[3px] text-[12px] cursor-pointer',
                        {
                            'hover:bg-color-black-bright': theme === 'dark',
                            'hover:bg-color-white-light': theme === 'light',
                        },
                    )}
                >
                    개인정보처리방침
                </div>
                <div className="w-[3px] h-[3px] rounded-[50%] bg-color-gray"></div>
                <div
                    className={classNames(
                        'rounded-[5px] px-[5px] py-[3px] text-[12px] cursor-pointer',
                        {
                            'hover:bg-color-black-bright': theme === 'dark',
                            'hover:bg-color-white-light': theme === 'light',
                        },
                    )}
                >
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
