const ADD_MANUALLY_RELEASE = 'ADD_FIRST_MANUALLY_RELEASE'
const CLEAR_TWO_ALBUMS_MCARRAY = 'CLEAR_TWO_ALBUMS_MCARRAY'
const DELETE_TWO_ALBUMS_MC = 'DELETE_TWO_ALBUMS_MC'

export const initialState = {
    MCArray: [],
}

export function manuallyReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MANUALLY_RELEASE:
            let releaseObj = {
                id: Date.now(),
                sideA: {id: Date.now(), artist: action.artist1, title: action.album1, tracks: action.tracks1},
                sideB: {id: Date.now() + 10, artist: action.artist2, title: action.album2, tracks: action.tracks2},
            }
            return {
                ...state,
                MCArray: [...state.MCArray, releaseObj]
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
        default:
            return state
    }
}

export const addManuallyRelease = (artist1, album1, tracks1, artist2, album2, tracks2) => ({
    type: ADD_MANUALLY_RELEASE,
    artist1, album1, tracks1,
    artist2, album2, tracks2
})

export const clearManuallyMCArray = () => ({type: CLEAR_TWO_ALBUMS_MCARRAY})
export const deleteManuallyMC = (id) => ({type: DELETE_TWO_ALBUMS_MC, id})

