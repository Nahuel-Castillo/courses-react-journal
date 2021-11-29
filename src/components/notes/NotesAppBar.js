import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startAddNewNote, setActiveNote, startUploading, startUpdateNote } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const { id, date } = active;

    const handleNoteChange = () => {

        if ( id ) {
            dispatch( startUpdateNote( active ) );
            dispatch( setActiveNote( null ) );
        } else {
            dispatch( startAddNewNote( active ) );
            dispatch( setActiveNote( null ) );
        }
    }

    const handleLoadPicture = ( ) => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = ( { target } ) => {
        const file = target.files[0];

        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="notes__appbar">
            <span> { date?.format('LL') || ''  } </span>

            <input 
                id="fileSelector"
                type="file"
                style={{ display: 'none'}}
                onChange={ handleFileChange }
            />
            
            <div>
                <button 
                    className="btn"
                    onClick={ handleLoadPicture }
                >
                    Picture    
                </button>

                <button 
                    className="btn"
                    onClick={ handleNoteChange }
                >
                    Save
                </button>
            </div>

        </div>
    )
}
