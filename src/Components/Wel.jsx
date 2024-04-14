import React from 'react'
import aiImage from '../constants/svg/aiicon.jpg';
import userimg from '../constants/svg/user.png';
export const First = ({ lightMode }) => {
  const client = [
    {
      id: 1,
      text: 'what is this about ?',

      Is_Ai: false
    },
    {
      id: 2,
      text: 'This Sarah AI',

      Is_Ai: true
    },
    // {
    //   id: 3,
    //   text: 'This Sarah AI',

    //   Is_Ai: false
    // },
    // {
    //   id: 4,
    //   text: 'This Sarah AI',

    //   Is_Ai: true
    // },
  ]


  return (
    <>
      {client.map(user => (
        <div key={user.id}>
          <div className={`flex gap-2 text-lg font-normal p-6 rounded-lg items-center `}>
            <img src={user.Is_Ai ? aiImage : userimg} alt="" className=' bg-white rounded-full w-14 ' />
            <p>{user.text}</p>
          </div>
        </div>
      ))}
    </>
  )
}

