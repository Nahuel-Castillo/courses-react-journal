
import moment from 'moment';

export const prepareNotes = ( notes = [] ) => {

    return notes.map( note => changeNoteDateToMoment( note ) );
};

export const changeNoteDateToMoment = ( note ) => {

    if ( note ) {
        return { ...note, date: moment( note.date ) };
    }

};