import { MODAL_HAS_CHANGED } from './types';

export function modalHasChanged(hasChanged) {
    return {
        type: MODAL_HAS_CHANGED,
        hasChanged
    };
}