export function shiftsHasErrored(state = false, action) {
    switch (action.type) {
        case 'SHIFTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function shiftsIsLoading(state = false, action) {
    switch (action.type) {
        case 'SHIFTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function shifts(state = [], action) {
    switch (action.type) {
        case 'SHIFTS_FETCH_DATA_SUCCESS':
            return action.shifts;

        default:
            return state;
    }
}