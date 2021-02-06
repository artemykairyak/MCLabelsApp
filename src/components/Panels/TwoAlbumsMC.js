import React, {useEffect, useState} from 'react'

const TwoAlbumsMC = ({printing, releases, deleteTwoAlbumsMC, mode, deleteManuallyMC}) => {
    const [sideA, setSideA] = useState(null)
    const [sideB, setSideB] = useState(null)

    useEffect(() => {
        if (releases) {
            setSideA(releases.sideA)
            setSideB(releases.sideB)
        }
    }, [releases])

    const changeSide = (index, side) => {
        let newSideA, newSideB
        if (side === 'A') {
            newSideB = {...sideB, tracks: [sideA.tracks[index], ...sideB.tracks]}
            newSideA = {...sideA, tracks: sideA.tracks.filter((item, i) => i !== index)}
        }

        if (side === 'B') {
            newSideA = {...sideA, tracks: [...sideA.tracks, sideB.tracks[index]]}
            newSideB = {...sideB, tracks: sideB.tracks.filter((item, i) => i !== index)}
        }

        setSideA(newSideA)
        setSideB(newSideB)
    }

    const deleteTrack = (index, side) => {
        if (side === 'A') {
            setSideA({...sideA, tracks: sideA.tracks.filter((item, i) => i !== index)})
        }

        if (side === 'B') {
            setSideB({...sideB, tracks: sideB.tracks.filter((item, i) => i !== index)})
        }
    }

    return (
        <div className={`mc ${printing ? 'mc_print' : ''}`}>
            <button onClick={() => mode === 'two' ? deleteTwoAlbumsMC(releases.id) : deleteManuallyMC(releases.id)}
                    className="mc__arr mc__delMCBtn">&#10006;</button>
            <div className="mc__front"/>
            <div className="mc__edge">
                   <span className="mc__title">
                       {!!sideA && `${sideA.artist} ${!!sideA.title ? `— ${sideA.title}` : ''} ${!!sideA.year ? `(${sideA.year})` : ''}`}
                   </span>
                <span className="mc__title">
                    {!!sideB && `${sideB.artist} ${!!sideB.title ? `— ${sideB.title}` : ''} ${!!sideB.year ? `(${sideB.year})` : ''}`}
                   </span>
            </div>
            <div className="mc__back">
                <span className="mc__side">Сторона A:</span>
                {!!(sideA && sideA.tracks) && sideA.tracks.map((track, i) => {
                    return <div className="mc__track" key={i}>
                        <span className="mc__track-title">{track}</span>
                        <button onClick={() => changeSide(i, 'A')} className="mc__arr mc__arr_bottom">B</button>
                        <button onClick={() => deleteTrack(i, 'A')} className="mc__arr mc__delBtn">&#10006;</button>
                    </div>
                })}
            </div>
            <div className="mc__insert">
                <span className="mc__side mc__side_b">Сторона B:</span>
                {!!(sideB && sideB.tracks) && sideB.tracks.map((track, i) => {
                    return <div key={i} className="mc__track">
                        <span className="mc__track-title">{track}</span>
                        <button onClick={() => changeSide(i, 'B')} className="mc__arr mc__arr_bottom">A</button>
                        <button onClick={() => deleteTrack(i, 'B')} className="mc__arr mc__delBtn">&#10006;</button>
                    </div>
                })}
            </div>
        </div>)
}

export default TwoAlbumsMC
