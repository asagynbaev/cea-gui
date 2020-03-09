import { MODAL_HAS_CHANGED } from '../_actions/types';

export function modalHasChanged(state = false, action) {
    switch (action.type) {
        case MODAL_HAS_CHANGED:
            return action.modalData;

        default:
            return state;
    }
}