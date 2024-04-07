import React from 'react'
import { PlusIcon, MessageIcon } from '../constants'

function NewChat({ newchat }) {

    return (
        <div>  <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
            {!newchat ? (< PlusIcon />) : (<MessageIcon />)}
            New chat
        </a></div>
    )
}

export default NewChat