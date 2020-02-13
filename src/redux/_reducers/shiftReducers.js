import { GET_SHIFTS, ADD_SHIFT, ASSIGN_SHIFT, DELETE_SHIFT } from '../_actions/types';

export default function shiftReducer(state = [], action) {
  switch (action.type) {
    case GET_SHIFTS:
      return [...state, action.payload];
    case ADD_SHIFT:
      return state.filter(shift => shift._id !== action.payload.id);
    case ASSIGN_SHIFT:
      return action.shifts;
    case DELETE_SHIFT:
      return action.shifts;
    default:
      return state;
  }
}