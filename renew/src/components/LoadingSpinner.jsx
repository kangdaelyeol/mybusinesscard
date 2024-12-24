import React from 'react'

export default function LoadingSpinner() {
    return (
        <div className="h-full w-full flex justify-center items-center gap-[5px]">
            <svg
                className="animate-spin h-5 w-5 mr-3 border-text-white border-[3px] border-t-transparent rounded-[50%]"
                viewBox="0 0 24 24"
            ></svg>
            Processing...
        </div>
    )
}
