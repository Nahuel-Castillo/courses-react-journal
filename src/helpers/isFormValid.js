import { useDispatch } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../actions/ui';

export const isFormValid = ( {  name, email, password, confirm }, dispatch ) => {

    if ( validator.isEmpty( name ) ) {
        dispatch( setError( 'Name is required' ) );
        return false;
    } 

    if ( validator.isEmpty( email ) ) {
        dispatch( setError( 'Email is required' ) );
        return false;
    } 
    else if ( !validator.isEmail( email ) ) {
        dispatch( setError( 'Email is not valid' ) );
        return false;
    }

    if ( validator.isEmpty( password ) ) {
        dispatch( setError( 'Password is required' ) );
        return false;
    } 
    else if ( !validator.isStrongPassword(password) ) {
        dispatch( setError( 'Password is not strong' ) );
        return false;
    }
    else if ( !validator.equals( password, confirm ) ) {
        dispatch( setError( 'The confirm password should equals to password' ) );
        return false;
    }

    dispatch( removeError());
    return true;
}