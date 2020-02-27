export function employeesHasErrored(state = false, action) {
    switch (action.type) {
        case 'EMPLOYEES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function employeesIsLoading(state = false, action) {
    switch (action.type) {
        case 'EMPLOYEES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function employees(state = [], action) {
    switch (action.type) {
        case 'GET_EMPLOYEES_SUCCESS':
            return action.employees;

        default:
            return state;
    }
}

export function employeesForAutocomplete(state = [], action) {
    switch (action.type) {
        case 'GET_EMPLOYEES_FOR_AUTOCOMPLETE_SUCCESS':
            return action.employeesForAutocomplete;

        default:
            return state;
    }
}