import { GET_SHIFTS, ADD_SHIFT, ASSIGN_SHIFT, DELETE_SHIFT, GET_POSITIONS } from './types';
import axios from 'axios';

const apiUrl = `https://ceaapi.herokuapp.com/`;

export const getShiftsSuccess = (shifts) => {
    return {
      type: GET_SHIFTS,
      shifts
    }
  }

  export const getAllShifts = () => {
    return (dispatch) => {
      return axios.get(apiUrl)
        .then(response => {
          dispatch(getShiftsSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const createShiftSuccess = (data) => {
    return {
      type: ADD_SHIFT,
      payload: {
        _id: data._id,
        title: data.title,
        body: data.body
      }
    }
  }

  export const createPost = ({ title, body }) => {
    return (dispatch) => {
      return axios.post(`shifts/${apiUrl}/`, {title, body})
        .then(response => {
          dispatch(createShiftSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export const assignShiftSuccess = (data) => {
    return {
      type: ASSIGN_SHIFT,
      payload: {
        id: data.id
      }
    }
  }

  export const deleteShiftSuccess = id => {
    return {
      type: DELETE_SHIFT,
      payload: {
        id
      }
    }
  }
  
export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteShiftSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getPositions = (positions) => {
    return {
      type: GET_POSITIONS,
      positions
    }
  }

  export const getAllPositions = id => {
    return (dispatch) => {
      return axios.get(`${apiUrl}/positions/id`)
        .then(response => {
          dispatch(getPositions(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };