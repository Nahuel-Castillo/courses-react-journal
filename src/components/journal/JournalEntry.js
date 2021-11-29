import React from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';

export const JournalEntry = ( { note } ) => {

    const dispatch = useDispatch();

    // const note = {
    //     id: 'kfjkwfiop32121',
    //     title: 'Don Quijote de la Mancha',
    //     body: 'Amor y deseo son dos cosas diferentes; que no todo lo que se ama se desea, ni todo lo que se desea se ama.',
    //     imageUrl: 'https://assets.puzzlefactory.pl/puzzle/299/726/original.jpg',
    //     date: moment( new Date().getTime() )
    // };

    const { title, body, imageUrl, date } = note;

    const handleSetActiveNote = () => {
        dispatch( setActiveNote( note ) );
    };

    return (
        <div 
            className="journal__entry animate__animated animate__slideInDown animate__faster"
            onClick={ handleSetActiveNote }    
        >
            {
                imageUrl && (
                    <div 
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${ imageUrl })`
                        }}
                    ></div>
                )
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                   { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ date.format('dddd') }</span>
                <h5>{ date.format('Do') }</h5>
            </div>
        </div>
    )
}
