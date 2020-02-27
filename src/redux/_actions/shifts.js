import axios from 'axios';

import { 
    ADD_SHIFT_SUCCESS, 
    GET_SHIFTS_SUCCESS, 
    SHIFTS_HAS_ERRORED, 
    SHIFTS_IS_LOADING
} from './types';

export function shiftsHasErrored(bool) {
    return {
        type: SHIFTS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function shiftsIsLoading(bool) {
    return {
        type: SHIFTS_IS_LOADING,
        isLoading: bool
    };
}

export const shiftsFetchDataSuccess = (data) => {
    return {
        type: GET_SHIFTS_SUCCESS,
        shifts: data
    };
}

export const shiftsFetchData = (url) => {
    return (dispatch) => {
        dispatch(shiftsIsLoading(true));
        return axios.get(url)
          .then(response => { dispatch(shiftsFetchDataSuccess(response.data)) })
          .then(dispatch(shiftsIsLoading(false)))
          .catch(error => { throw(error); });
      };
}

export const addShiftSuccess = (data) => ({
  type: ADD_SHIFT_SUCCESS,
  payload: {
          ...data
        }
});

export const addShift = (url, data) => {
    return (dispatch) => {
        dispatch(addShiftSuccess(data));
    //     return axios.post(`https://ceaapi.herokuapp.com/shifts/`, data, {
    //        headers: { "Content-Type": "application/json" }})
    //       .then(response => { dispatch(addShiftSuccess(data)) })
    //       .catch(error => { throw(error); });
      };
}
