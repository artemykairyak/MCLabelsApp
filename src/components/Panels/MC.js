import React, {useEffect, useState} from 'react'

const MC = ({printing, release, deleteOneAlbumMC}) => {
    const [sideA, setSideA] = useState([])
    const [sideB, setSideB] = useState([])
    const [isOverflow, setIsOverflow] = useState(false)

    useEffect(() => {
        if (release) {
            setSideA(release.tracks.slice(0, Math.round(release.tracks.length / 2)))
            setSideB(release.tracks.slice(Math.round(release.tracks.length / 2)))
        }
    }, [release])

    const changeSide = (index, side) => {
        let newSideA, newSideB
        if (side === 'A') {
            newSideB = [sideA[index], ...sideB]
            newSideA = sideA.filter((item, i) => i !== index)
        }

        if (side === 'B') {
            newSideA = [...sideA, sideB[index]]
            newSideB = sideB.filter((item, i) => i !== index)
        }

        setSideA(newSideA)
        setSideB(newSideB)
    }

    const deleteTrack = (index, side) => {
        if (side === 'A') {
            setSideA(sideA.filter((item, i) => i !== index))
        }

        if (side === 'B') {
            setSideB(sideB.filter((item, i) => i !== index))
        }
    }

    useEffect(() => {
        setIsOverflow(isOverflown())
    }, [sideA, sideB])

    const isOverflown = (type = 'back') => {
        let height = 0
        let tracks = document.querySelectorAll(`.mc_${release.id} .mc__track`)
        let sides = document.querySelectorAll(`.mc_${release.id} .mc__side`)
        tracks.forEach(item => height += item.offsetHeight)
        sides.forEach(item => height += item.offsetHeight)

        return height > (document.querySelector(`.mc_${release.id} .mc__${type}`).clientHeight)
    }
    return (
        <div className={`mc ${printing ? 'mc_print' : ''} mc_${release.id}`}>
            <button onClick={() => deleteOneAlbumMC(release.id)}
                    className="mc__arr mc__delMCBtn">&#10006;</button>
            <div className="mc__front"/>
            <div className="mc__edge">
                   <span className="mc__title">
                       {release && `${release.artist} — ${release.title} (${release.year})`}
                   </span>
            </div>
            <div className="mc__back">
                <span className="mc__side">Сторона A:</span>
                {sideA.map((track, i) => {
                    return <div className="mc__track" key={i}>
                        <span className="mc__track-title">{track}</span>
                        <button onClick={() => changeSide(i, 'A')} className="mc__arr mc__arr_bottom">B</button>
                        <button onClick={() => deleteTrack(i, 'A')} className="mc__arr mc__delBtn">&#10006;</button>
                    </div>
                })}
                {!isOverflow &&
                <>
                    <span className="mc__side mc__side_b">Сторона B:</span>
                    {sideB.map((track, i) => {
                        return <div key={i} className="mc__track">
                            <span className="mc__track-title">{track}</span>
                            <button onClick={() => changeSide(i, 'B')} className="mc__arr mc__arr_bottom">A</button>
                            <button onClick={() => deleteTrack(i, 'B')}
                                    className="mc__arr mc__delBtn">&#10006;</button>
                        </div>
                    })}
                </>
                }
            </div>
            {isOverflow && <div className="mc__insert">
                <span className="mc__side mc__side_b">Сторона B:</span>
                {sideB.map((track, i) => {
                    return <div key={i} className="mc__track">
                        <span className="mc__track-title">{track}</span>
                        <button onClick={() => changeSide(i, 'B')} className="mc__arr mc__arr_bottom">A</button>
                        <button onClick={() => deleteTrack(i, 'A')} className="mc__arr mc__delBtn">&#10006;</button>
                    </div>
                })}
            </div>}
        </div>)
}

export default MC
