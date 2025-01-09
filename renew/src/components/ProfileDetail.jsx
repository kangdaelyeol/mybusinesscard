import AvatarSizing from './AvatarSizing'
import ImgDisplay from './ImgDisplay'
import LoadingSpinner from './LoadingSpinner'
import useProfileDetail from '../hooks/useProfileDetail'

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

            <div
                onClick={handleLogoutClick}
                className="py-[10px] w-[300px] text-center bg-color-black cursor-pointer hover:bg-color-black-bright rounded-[8px]"
            >
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
