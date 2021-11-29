
import { combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from './notesReducer';

export const rootReducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});