export function employeesHasErrored(bool) {
    return {
        type: 'EMPLOYEES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function employeesIsLoading(bool) {
    return {
        type: 'EMPLOYEES_IS_LOADING',
        isLoading: bool
    };
}



export function employeesFetchDataSuccess(employees) {
    return {
        type: 'GET_EMPLOYEES_SUCCESS',
        employees
    };
}

export function employeesFetchData(url) {
    return (dispatch) => {
        dispatch(employeesIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(employeesIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((employees) => dispatch(employeesFetchDataSuccess(employees)))
            .catch(() => dispatch(employeesHasErrored(true)));
    };
}



export function getEmployeesForAutompleteFetchDataSuccess(employeesForAutocomplete) {
    return {
        type: 'GET_EMPLOYEES_FOR_AUTOCOMPLETE_SUCCESS',
        employeesForAutocomplete
    };
}

export function getEmployeesForAutocompleteFetchData(url) {
    return (dispatch) => {
        dispatch(employeesIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(employeesIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((employeesForAutocomplete) => dispatch(getEmployeesForAutompleteFetchDataSuccess(employeesForAutocomplete)))
            .catch(() => dispatch(employeesHasErrored(true)));
    };
}