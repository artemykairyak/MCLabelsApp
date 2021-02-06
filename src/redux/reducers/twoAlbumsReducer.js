const ADD_TWO_ALBUMS_RELEASE = 'ADD_TWO_ALBUMS_RELEASE'
const CLEAR_TWO_ALBUMS_MCARRAY = 'CLEAR_TWO_ALBUMS_MCARRAY'
const DELETE_TWO_ALBUMS_MC = 'DELETE_TWO_ALBUMS_MC'
const SET_FAILED_SEARCH = 'SET_FAILED_SEARCH'

export const initialState = {
    MCArray: [],
    failedSearch: {firstRelease: false, secondRelease: false}
}

export function twoAlbumsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TWO_ALBUMS_RELEASE:
            let releasesObj = {
                id: Date.now(),
                sideA: action.release1,
                sideB: action.release2
            }
            return {
                ...state,
                MCArray: [...state.MCArray, releasesObj]
            }
        case CLEAR_TWO_ALBUMS_MCARRAY:
            return {
                ...state,
                MCArray: [],
            }
        case DELETE_TWO_ALBUMS_MC:
            return {
                ...state,
                MCArray: state.MCArray.filter(item => item.id !== action.id),
            }
        case SET_FAILED_SEARCH:
            return {
                ...state,
                failedSearch: action.searchObj
            }
        default:
            return state
    }
}

export const addTwoAlbumsRelease = (release1, release2) => ({type: ADD_TWO_ALBUMS_RELEASE, release1, release2})
export const clearTwoAlbumsMCArray = () => ({type: CLEAR_TWO_ALBUMS_MCARRAY})
export const deleteTwoAlbumsMC = (id) => ({type: DELETE_TWO_ALBUMS_MC, id})
export const setFailedSearch = (searchObj) => ({type: SET_FAILED_SEARCH, searchObj})
