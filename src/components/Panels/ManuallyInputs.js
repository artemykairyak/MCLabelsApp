import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {addManuallyRelease, clearManuallyMCArray} from '../../redux/reducers/manuallyReducer'
import {parseTracklist} from '../../functions'
import {setFailedSearch} from '../../redux/reducers/twoAlbumsReducer'

const ManuallyInputs = ({print, addManuallyRelease, clearManuallyMCArray, manuallyMCArray, failedSearch, setFailedSearch}) => {
    const [artist1, setArtist1] = useState('')
    const [artist2, setArtist2] = useState('')
    const [album1, setAlbum1] = useState('')
    const [album2, setAlbum2] = useState('')
    const [tracks1, setTracks1] = useState('')
    const [tracks2, setTracks2] = useState('')

    useEffect(() => {
        if (failedSearch) {
            if (failedSearch.firstRelease && !failedSearch.secondRelease) {
                let {artist, title, year, tracks} = failedSearch.firstRelease
                setArtist1(artist)
                setAlbum1(`${title} (${year})`)
                setTracks1(tracks.join('\n'))
            } else if (!failedSearch.firstRelease && failedSearch.secondRelease) {
                let {artist, title, year, tracks} = failedSearch.secondRelease
                setArtist2(artist)
                setAlbum2(`${title} (${year})`)
                setTracks2(tracks.join('\n'))
            }
        }

        setFailedSearch(null)
    }, [])

    const setReleases = (e) => {
        e.preventDefault()
        let parsedTracks1 = parseTracklist(tracks1)
        let parsedTracks2 = parseTracklist(tracks2)
        addManuallyRelease(artist1, album1, parsedTracks1, artist2, album2, parsedTracks2)
        clearInputs()
    }

    const clearInputs = () => {
        setArtist1('')
        setArtist2('')
        setAlbum1('')
        setAlbum2('')
        setTracks1('')
        setTracks2('')
    }

    return (
        <form onSubmit={() => !(artist1 && artist2) && setReleases()}
              className="search-panel search-panel_manually">
            <div className="search-col">
                <div className="search__side">
                    <span className="search__sideText">Сторона A:</span>
                    <input type="text" placeholder="Исполнитель" onChange={(e) => setArtist1(e.target.value)}
                           value={artist1}
                           className="inputs_input"/>
                    <input type="text" placeholder="Альбом" onChange={(e) => setAlbum1(e.target.value)} value={album1}
                           className="inputs_input"/>
                </div>
                <textarea name="sideA" placeholder="Треклист стороны А" className="textarea" value={tracks1}
                          onChange={(e) => setTracks1(e.target.value)}/>
            </div>
            <div className="search-col">
                <div className="search__side">
                    <span className="search__sideText">Сторона B:</span>
                    <input type="text" placeholder="Исполнитель" onChange={(e) => setArtist2(e.target.value)}
                           value={artist2}
                           className="inputs_input"/>
                    <input type="text" placeholder="Альбом" onChange={(e) => setAlbum2(e.target.value)} value={album2}
                           className="inputs_input"/>
                </div>
                <textarea name="sideB" placeholder="Треклист стороны В" className="textarea" value={tracks2}
                          onChange={(e) => setTracks2(e.target.value)}/>
            </div>

            <div className="search-buttons">
                <button type="submit" disabled={!(artist1 && artist2)} className="btn searchBtn"
                        onClick={setReleases}>Добавить
                </button>
                <button type="button" disabled={!(!!manuallyMCArray.length)} onClick={print}
                        className="btn printBtn">Печать
                </button>
                <button type="button" disabled={!(!!manuallyMCArray.length)} className="btn clearBtn"
                        onClick={clearManuallyMCArray}>Очистить
                </button>
            </div>
        </form>
    )
}

export default connect(state => ({
    manuallyMCArray: state.manually.MCArray,
    failedSearch: state.twoAlbums.failedSearch
}), {addManuallyRelease, clearManuallyMCArray, setFailedSearch})(ManuallyInputs)
