import React from 'react'
import './Panels.css'
import MC from './MC'
import {connect} from 'react-redux'
import TwoAlbumsMC from './TwoAlbumsMC'
import {deleteOneAlbumMC} from '../../redux/reducers/oneAlbumReducer'
import {deleteTwoAlbumsMC} from '../../redux/reducers/twoAlbumsReducer'
import {deleteManuallyMC} from '../../redux/reducers/manuallyReducer'

const ResultPanel = ({
                         mode, printing, isOverflow, setIsOverflow, oneAlbumMCArray, twoAlbumsMCArray, manuallyArray,
                         deleteOneAlbumMC, deleteTwoAlbumsMC, deleteManuallyMC
                     }) => {
    if (mode === 'one') {
        return <div className={`result-panel ${printing ? 'printing' : ''}`}>
            {oneAlbumMCArray.map((item, i) => {
                return <MC key={i}
                           release={item}
                           isOverflow={isOverflow}
                           setIsOverflow={setIsOverflow}
                           mode={mode}
                           deleteOneAlbumMC={deleteOneAlbumMC}/>
            })}
        </div>
    }

    if (mode === 'two') {
        return <div className={`result-panel result-panel_two ${printing ? 'printing' : ''}`}>
            {twoAlbumsMCArray.map((item, i) => {
                return <TwoAlbumsMC key={i}
                                    releases={item}
                                    isOverflow={isOverflow}
                                    setIsOverflow={setIsOverflow}
                                    mode={mode}
                                    deleteTwoAlbumsMC={deleteTwoAlbumsMC}/>
            })}
        </div>
    }

    if (mode === 'manually') {
        return <div className={`result-panel result-panel_manually ${printing ? 'printing' : ''}`}>
            {manuallyArray.map((item, i) => {
                return <TwoAlbumsMC key={i}
                                    releases={item}
                                    isOverflow={isOverflow}
                                    setIsOverflow={setIsOverflow}
                                    deleteManuallyMC={deleteManuallyMC}
                                    mode={mode}/>
            })}
        </div>
    }
}

export default connect(state => ({
    oneAlbumMCArray: state.oneAlbum.MCArray,
    twoAlbumsMCArray: state.twoAlbums.MCArray,
    manuallyArray: state.manually.MCArray
}), {deleteOneAlbumMC, deleteTwoAlbumsMC, deleteManuallyMC})(ResultPanel)
