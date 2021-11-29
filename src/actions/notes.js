import moment from "moment";
import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNotes';
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
import { finishLoading, startLoading } from "./ui";

const addNewNoteAction = ( note ) => ( { type: types.notesAddNew, payload: note } );

const loadNotesAction = ( notes ) => ( { type: types.notesLoad, payload: notes } );

const updateNotesAction = ( note ) => ( { type: types.notesUpdate, payload: note } );

export const setActiveNote = ( note ) => ( { type: types.notesSetActive, payload: note } );

export const logoutCleaningNotes = ( ) => ( { type: types.notesLogoutCleaning } );

const deleteNote = ( id ) => ( { type: types.notesDelete, payload: id });

export const startAddNewNote = ( note ) => {

    return async( dispatch, getState ) => {

        try {
            dispatch( startLoading() );
            
            const { uid } = getState().auth;
    
            const doc = await db.collection(`${ uid }/journal/notes`).add( { ...note, date: note.date.toDate().getTime() } );
    
            note.id = doc.id;
    
            dispatch( addNewNoteAction( note ) );

            Swal.fire('Added!', 'The note was added successfully.', 'success')
                .then( () => dispatch( finishLoading() ));

        } catch (error) {
            Swal.fire('Error', 'An error occurred, note was not added.', 'error');
        } 
    };
};

export const startUpdateNote = ( note ) => {

    return async( dispatch, getState ) => {

        try {
            dispatch( startLoading() );
            
            const { uid } = getState().auth;
    
            const noteToFirestore = { ...note };
            delete noteToFirestore.id;
    
            await db.collection(`${ uid }/journal/notes`)
                .doc( note.id )
                .update( { ...noteToFirestore, date: note.date.toDate().getTime() } );
    
            dispatch( updateNotesAction( note ) );

            Swal.fire('Updated!', 'The note was updated successfully.', 'success')
                .then( () => dispatch( finishLoading() ));

        } catch (error) {
            Swal.fire('Error', 'An error occurred, note was not updated.', 'error');
        } 

    };
}

export const startLoadNotes = ( uid ) => {
    
    return async( dispatch ) => {

        try {
            dispatch( startLoading() );
            
            const notes = await loadNotes( uid );
    
            dispatch ( loadNotesAction( notes ) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'An error occurred. Please refresh the web page.', 'error');
        } finally {
            dispatch( finishLoading() );
        }

    };
};

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active:activeNote } = getState().notes;

        try {
            dispatch( startLoading() );

            const fileUrl = await fileUpload( file );
            activeNote.imageUrl = fileUrl;
            
            // if ( activeNote.id ) {

            //     dispatch( startUpdateNote( activeNote ) );
            // } else {
                dispatch( setActiveNote( activeNote ) );
            // }

        } catch (error) {
            console.log( error );
        } finally {

            dispatch( finishLoading() );   
        }

    }
}

export const startDeleteNote = ( id ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        try {
            dispatch( startLoading() );

            await db.doc(`${ uid }/journal/notes/${ id }`).delete();

            dispatch( deleteNote( id ) );
            
        } catch (error) {
            console.log(error);
        } finally {

            dispatch( finishLoading() );
        }
    }
};

