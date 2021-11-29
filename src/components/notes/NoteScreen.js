import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setActiveNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const { active } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const { id, title, body, imageUrl } = active;

    const handleTitleChange = ( { target } ) => {
        dispatch( setActiveNote({ 
            ...active,
             title: target.value
        }) );
    };

    const handleBodyChange = ( { target } ) => {
        dispatch( setActiveNote({
            ...active,
            body: target.value
        }) );
    };

    const handleDelete = () => {
        dispatch( startDeleteNote( id ) );
    };

    return (
        <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
            
            <NotesAppBar/>

            <div className="notes__content">
                
                <input 
                    name='title'
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input animate__animated animate__fadeIn animate__faster"
                    value={ title }
                    onChange={ handleTitleChange }
                />
                
                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea animate__animated animate__fadeIn animate__faster"
                    value={ body }
                    onChange={ handleBodyChange }
                ></textarea>

                {
                    imageUrl && (

                        <div className="notes__image animate__animated animate__fadeIn animate__faster">
                            <img
                                src={ imageUrl  }
                                alt={ title }
                            />
                        </div>
                    )
                }

                {
                    id &&
                    <button
                        className="btn btn-danger m-1 animate__animated animate__fadeIn animate__faster"
                        onClick={ handleDelete }
                    >
                        Delete
                    </button>
                }
            </div>
        </div>
    )
}
