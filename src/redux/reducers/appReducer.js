const SET_ERROR_TEXT = 'SET_ERROR_TEXT';

const initialState = {
    errorText: ''
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR_TEXT:
            return {
                ...state,
                errorText: action.errorText
            }
        default:
            return state;
    }
}

export const setErrorText = (errorText) => ({type: SET_ERROR_TEXT, errorText});
