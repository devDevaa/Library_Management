import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function NoteForm() {

    let { id } = useParams();
    let [body, setBody] = useState('');

    

    let addNote = (e) => {
        e.preventDefault();
        let data = {
            body,
            bookUid: id
        }
        console.log(data)
    }

    return (
        <form onSubmit={addNote}>
            <textarea value={body} onChange={e => setBody(e.target.value)}
                className="p-3 shadow-sm border-2 bg-gray-50 w-full"
                name=""
                id=""
                rows={5}
            ></textarea>
            <button
                className=" my-3 text-white bg-primary px-3 py-2 rounded-md flex items-center gap-1"
            >
                <span className="hidden md:block">Add Book</span>
            </button>
        </form>
    )
}
