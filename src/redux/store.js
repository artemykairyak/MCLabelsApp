import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {appReducer} from "./reducers/appReducer";
import {oneAlbumReducer} from "./reducers/oneAlbumReducer";
import {twoAlbumsReducer} from "./reducers/twoAlbumsReducer";
import {manuallyReducer} from "./reducers/manuallyReducer";

let reducers = combineReducers({
    app: appReducer,
    oneAlbum: oneAlbumReducer,
    twoAlbums: twoAlbumsReducer,
    manually: manuallyReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
