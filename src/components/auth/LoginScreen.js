import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPasswords } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui ); // return state in store

    const [ formValues, handleInputChange ] = useForm({
        email: 'nahuel@gmail.com',
        password: 'Nahuel.Castillo12345'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( startLoginEmailPasswords( email, password ) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleLogin }>

                {/* {
                    !!msgError &&
                    <div className="auth__alert-error">
                        <p>
                            { msgError }
                        </p>
                    </div>
                } */}

                <input 
                    type="email"
                    placeholder="Email"
                    name="email"
                    className='auth__input'
                    value={ email }
                    onChange={ handleInputChange }
                />
                
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className='auth__input'
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>
                
                <div className="auth__social-networks">
                    <p> Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create a new account
                </Link>
            </form>
        </div>
    )
}
