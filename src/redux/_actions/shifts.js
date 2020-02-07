export function shiftsHasErrored(bool) {
    return {
        type: 'SHIFTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function shiftsIsLoading(bool) {
    return {
        type: 'SHIFTS_IS_LOADING',
        isLoading: bool
    };
}

export function shiftsFetchDataSuccess(shifts) {
    return {
        type: 'SHIFTS_FETCH_DATA_SUCCESS',
        shifts
    };
}

export function shiftsFetchData(url) {
    return (dispatch) => {
        dispatch(shiftsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(shiftsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((shifts) => dispatch(shiftsFetchDataSuccess(shifts)))
            .catch(() => dispatch(shiftsHasErrored(true)));
    };
}