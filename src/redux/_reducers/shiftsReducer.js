import {
    ADD_SHIFT_SUCCESS,
    // ADD_SHIFT_STARTED,
    // ADD_SHIFT_FAILURE,
    SHIFTS_IS_LOADING,
    //SHIFTS_HAS_ERRORED,
    GET_SHIFTS_SUCCESS
  } from '../_actions/types';

export function shifts(state = [], action) {
    switch (action.type) {
        // case SHIFTS_HAS_ERRORED:
        //     return action.hasErrored;
        // case 'SHIFTS_IS_LOADING':
        //     return action.isLoading;
        case GET_SHIFTS_SUCCESS:
            return action.shifts;
        case ADD_SHIFT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.payload)
              ];
        default:
            return state;
    }
}

export function shiftsIsLoading(state = false, action) {
    switch (action.type) {
        case SHIFTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function shiftsHasErrored(state = false, action) {
    switch (action.type) {
        case 'SHIFTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

