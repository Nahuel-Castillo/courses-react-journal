import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';
import { finishLoading, setError, startLoading, removeError } from './ui';
import { types } from "../types/types";
import { logoutCleaningNotes } from './notes';

//action async
export const startLoginEmailPasswords = ( email, password) => {
    return ( dispatch ) => {
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ( { user } ) => {

                dispatch( finishLoading() );
                dispatch( login( user.uid, user.displayName ) );
                dispatch( removeError() );
            })
            .catch((e) => {

                dispatch( finishLoading() );
                dispatch( setError(e.message) );
                Swal.fire({ 
                    title:'Error',
                    text: e.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
       
    }
};

//action async
export const startGoogleLogin = () => {

    return ( dispatch ) => {
        
        dispatch( startLoading() );
        
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( async( { user: { uid, displayName } } ) => {

                dispatch( finishLoading() );
                dispatch( login( uid, displayName ) ); //notice this call normal action inside async action
                dispatch( removeError() );
            })
            .catch( e => {

                dispatch( finishLoading() );
                // dispatch( setError( e.message ) );
                Swal.fire({ 
                    title:'Error',
                    text: e.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            });
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    return ( dispatch ) => {

        dispatch( startLoading() );

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async( { user } ) => {

                await user.updateProfile( { displayName: name } );

                dispatch( finishLoading() );
                dispatch( login( user.uid, user.displayName) );
                dispatch( removeError() );
            })
            .catch( (e) => {

                dispatch( finishLoading() );
                // dispatch( setError(e.message) );
                Swal.fire({ 
                    title:'Error',
                    text: e.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } );
    }

}

export const startLogout = () => {

    return async( dispatch ) => {

        await firebase.auth().signOut();

        dispatch( logoutCleaningNotes() );
        dispatch( logout() );
        localStorage.clear();
    }
}

export const logout = () => ( { type: types.authLogout } );


export const login = ( uid, displayName ) => ({
    type: types.authLogin,
    payload: { uid, displayName }
});