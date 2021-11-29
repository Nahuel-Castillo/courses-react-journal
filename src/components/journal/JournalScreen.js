import React from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );

    const { loading } = useSelector( state => state.ui );

    if ( loading ) {
         
        Swal.fire({
        title: 'Loading...',
        text: 'Please wait',
        allowOutsideClick: false,
        showConfirmButton: false,
        
        willOpen: () => {
            Swal.showLoading();
        }});
        
    } else {
    
        Swal.close();
    }

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
             
             <Sidebar/>

             <main>
                {
                    ( active?.title !== undefined ) 
                    ? <NoteScreen/>
                    : <NothingSelected />
                }
             </main>
        </div>
    )
}
