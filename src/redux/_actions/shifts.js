import axios from 'axios';

import { 
    ADD_SHIFT_SUCCESS, 
    GET_SHIFTS_SUCCESS, 
    SHIFTS_HAS_ERRORED, 
    SHIFTS_IS_LOADING,
    DELETE_SHIFT,
    ASSIGN_SHIFT
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
        return axios.post(url, data, { headers: { "Content-Type": "application/json" }})
          .then((response) => {
              response.data.forEach(function(item) {
                dispatch(addShiftSuccess(item));
              });
          })
          .catch(error => { throw(error); });
      };
}

export function deleteShiftSuccess(shift) {
    return {type: DELETE_SHIFT, shift}
  }
  
  export function deleteShift(shiftId) {
    return function(dispatch) {
      return axios.delete(`https://ceaapi.herokuapp.com/shifts/${shiftId}`).then(() => {
        dispatch(deleteShiftSuccess(shiftId));
        return;
      }).catch(error => {
        throw(error);
      })
  }
}


export function assignShiftSuccess(data) {
  return {type: ASSIGN_SHIFT, data}
}
  
export function assingShift(url, shift) {
  return function(dispatch) {
    return axios.put(url, shift, {
      headers: { "Content-Type": "application/json" }
      }).then((response) => {
      dispatch(assignShiftSuccess(response.data));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function cancelShiftSuccess(data) {
  return {type: ASSIGN_SHIFT, data}
}

export function cancelShift(url, shift) {
  return function(dispatch) {
    console.log(shift);
    return axios.put(url, shift, {
      headers: { "Content-Type": "application/json" }
  }).then((response) => {
      dispatch(cancelShiftSuccess(response.data));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

