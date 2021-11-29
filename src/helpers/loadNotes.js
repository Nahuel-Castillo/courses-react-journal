import { db } from "../firebase/firebaseConfig"
import { prepareNotes } from "./prepareNotes";

export const loadNotes = async( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

    const notes = [];

    notesSnap.forEach( snapChild => {
       notes.push( { id: snapChild.id, ...snapChild.data() } );
    });

    return prepareNotes(notes);
}