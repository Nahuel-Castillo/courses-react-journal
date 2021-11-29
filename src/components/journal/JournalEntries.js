import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const entries = useSelector(state => [ ...state.notes.notes ] );

    return (
        <div className="journal__entries">
            
            {
                entries.map( note => (
                    <JournalEntry key={ note.id } note={ note }/>
                ))
            }

        </div>
    )
}
