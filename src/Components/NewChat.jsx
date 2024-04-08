// NewChat.jsx
import React from 'react';
import { PlusIcon, MessageIcon, DeleteIcon } from '../constants';

function NewChat({ newchat, id, onDelete }) {
    console.log("newchat:", newchat)
    console.log("id:", id)

    function handleDelete() {
        console.log(onDelete)
        onDelete(id)
    }


    return (
        <div className="flex py-3 px-3 items-center gap-2 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
            {!newchat ? <PlusIcon /> : <MessageIcon />}
            <span className="ml-2">New chat</span>
            {newchat && <DeleteIcon className="ml-auto" onClick={handleDelete} />}
        </div>
    );
}

export default NewChat;
