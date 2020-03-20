import {
    ADD_SHIFT_SUCCESS,
    SHIFTS_HAS_ERRORED,
    SHIFTS_IS_LOADING,
    GET_SHIFTS_SUCCESS,
    DELETE_SHIFT,
    ASSIGN_SHIFT,
    CANCEL_SHIFT
  } from '../_actions/types';

export function shifts(state = [], action) {
    switch (action.type) {
        case GET_SHIFTS_SUCCESS:
            return action.shifts;
        case ADD_SHIFT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.payload)
              ];
        case ASSIGN_SHIFT:
            return state.map((item, index) => {
                if(item.id === action.data.id) {
                  return {
                    ...item,
                    employeeId: action.data.employeeId,
                    title: action.data.title
                  }
                }
                return item;
              })
        case DELETE_SHIFT: 
            return state.filter((shift)=>shift.id !== action.shift);
        case CANCEL_SHIFT:
            return state.map((item, index) => {
                if(item.id === action.data.id) {
                  return {
                    ...item,
                    isCanceled: action.data.isCanceled,
                    canceledBy: action.data.canceledBy,
                    canceledAt: action.data.canceledAt
                  }
                }
                return item;
            })
        case SHIFTS_HAS_ERRORED:
            return action.hasErrored;
        // case SHIFTS_IS_LOADING:
        //     return action.isLoading;
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

