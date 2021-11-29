// {
//     notes: [],
//     active: {
//         id: 'kfjkwfiop32121',
//         title: '',
//         body: '',
//         imageUrl: '',
//         date: 21312312124
//     }
// }

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
};

export const notesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.notesAddNew:
            return {
                ...state,
                notes: [ ...state.notes, { ...action.payload } ]
            }
        case types.notesSetActive:
            return { 
                ...state,
                active: { ...action.payload }
            }
        case types.notesUpdate:
            return { 
                ...state,
                notes: state.notes.map( n => 
                    ( n.id === action.payload.id ) 
                        ? action.payload
                        : n
                )
            };
            
        case types.notesLoad:
            return { ...state, notes: [ ...action.payload ] }
        
        case types.notesLogoutCleaning:
                return { ...initialState }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes:  state.notes.filter( note => note.id !== action.payload )
            }

        default:
            return state;
    }
};