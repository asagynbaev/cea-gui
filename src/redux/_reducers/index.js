import { combineReducers } from 'redux';
import shifts from './shiftReducers';

export default combineReducers({
    shifts: shifts
});