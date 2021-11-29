import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { firebase } from '../firebase/firebaseConfig';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadNotes } from '../actions/notes';
import Swal from 'sweetalert2';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
         
        firebase.auth().onAuthStateChanged( async( user ) => {
            
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( startLoadNotes( user.uid ) );
            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );
        });

    }, []);

    if ( checking ) {
         
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
        <Router>
            
            <div>
                <Switch>

                    <PublicRoute isLoggedIn={ isLoggedIn } path="/auth" component={ AuthRouter }/>
                    <PrivateRoute exact isLoggedIn={ isLoggedIn } path="/" component={ JournalScreen }/>
                    <Redirect to="/auth" />
                </Switch>

            </div>

        </Router>
    );
};
