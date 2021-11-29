import { types } from "../types/types";

const initialState = {
    uid: null,
    name: null,
};

export const authReducer = ( state = initialState, action) => {

    switch ( action.type ) {
        
        case types.authLogin:
           return { 
                uid: action.payload.uid, 
                name: action.payload.displayName
            };

        case types.authLogout:
            return { ...initialState };

        default:
            return state;
    }
}