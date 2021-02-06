const ADD_ONE_ALBUM_RELEASE = 'ADD_ONE_ALBUM_RELEASE'
const CLEAR_ONE_ALBUM_MCARRAY = 'CLEAR_ONE_ALBUM_MCARRAY'
const DELETE_ONE_ALBUM_MC = 'DELETE_ONE_ALBUM_MC'

export const initialState = {
    MCArray: []
}

export function oneAlbumReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ONE_ALBUM_RELEASE:
            console.log(action)
            return {
                ...state,
                MCArray: [...state.MCArray, action.release],
            }
        case CLEAR_ONE_ALBUM_MCARRAY:
            return {
                ...state,
                MCArray: [],
            }
        case DELETE_ONE_ALBUM_MC:
            return {
                ...state,
                MCArray: state.MCArray.filter(item => item.id !== action.id),
            }
        default:
            return state
    }
}

export const addOneAlbumRelease = (release) => ({type: ADD_ONE_ALBUM_RELEASE, release})
export const clearOneAlbumMCArray = () => ({type: CLEAR_ONE_ALBUM_MCARRAY})
export const deleteOneAlbumMC = (id) => ({type: DELETE_ONE_ALBUM_MC, id})
