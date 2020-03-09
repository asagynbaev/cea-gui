import { combineReducers } from 'redux';
import { positions, positionsHasErrored, positionsIsLoading } from './positionsReducers';
import { shifts, shiftsHasErrored, shiftsIsLoading } from './shiftsReducer';
import { employees, employeesForAutocomplete, employeesHasErrored, employeesIsLoading } from './employeesReducers';
import { modalHasChanged } from './modalReducer';

export default combineReducers({
    positions,
    positionsHasErrored,
    positionsIsLoading,

    shifts,
    shiftsHasErrored,
    shiftsIsLoading,

    employees,
    employeesForAutocomplete,
    employeesHasErrored,
    employeesIsLoading,

    modalHasChanged,
});