import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { isFormValid } from '../../helpers/isFormValid';

import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({
        name: 'Nahuel',
        email: 'nahuel@gmail.com',
        password: 'Nahuel.Castillo12345',
        confirm: 'Nahuel.Castillo12345'
    });

    const { name, email, password, confirm } = values;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid( values, dispatch ) ) {
            dispatch( startRegisterWithEmailPasswordName( email, password, name) );
        }
    };

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                {/* {
                    !!msgError &&
                    <div className="auth__alert-error">
                        <p>
                            { msgError }
                        </p>
                    </div>
                } */}

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className='auth__input'
                    value={ name}
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
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

                <input 
                    type="password"
                    placeholder="Confim password"
                    name="confirm"
                    className='auth__input'
                    value={ confirm }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                
                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already Register?
                </Link>
              
            </form>
        </div>
    )
}
