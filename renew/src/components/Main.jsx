import React from 'react'
import CardEditor from './CardEditor'

export default function Main() {
    return (
        <div className="bg-gray-900">
            <div className="max-w-[1100px] mx-auto flex">
                <div className="grow">
                    <CardEditor />

                    {/* <Cardmaker AvatarComp={AvatarComp} onSave={addCard} /> */}
                </div>
                <div className="grow">
                    {/* {Object.keys(cards).map((key, index) => {
                    return <MyCard key={key} {...cards[key]} />
                })} */}
                </div>
            </div>
        </div>
    )
}
