import React from 'react'
import SearchPanel from './SearchPanel'
import ResultPanel from './ResultPanel'

const OneAlbum = ({printing, print, mode}) => {
    return (
        <div>
            {!printing && <SearchPanel print={print} mode={mode}/>}
            <ResultPanel printing={printing} mode={mode}/>
        </div>
    )
}

export default OneAlbum
