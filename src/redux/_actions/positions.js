import axios from 'axios';
const apiUrl = `https://ceaapi.herokuapp.com/`;

export function positionsHasErrored(bool) {
    return {
        type: 'POSITIONS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function positionsIsLoading(bool) {
    return {
        type: 'POSITIONS_IS_LOADING',
        isLoading: bool
    };
}

export function positionsFetchDataSuccess(positions) {
    return {
        type: 'POSITIONS_FETCH_DATA_SUCCESS',
        positions
    };
}

export function positionsFetchData(url) {
    return (dispatch) => {
        dispatch(positionsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(positionsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((positions) => dispatch(positionsFetchDataSuccess(positions)))
            .catch(() => dispatch(positionsHasErrored(true)));
    };
}