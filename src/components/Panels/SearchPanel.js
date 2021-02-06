import React, {useState} from 'react';
import {searchAPI} from "../../api/api";
import {addOneAlbumRelease, clearOneAlbumMCArray} from "../../redux/reducers/oneAlbumReducer";
import {connect} from "react-redux";
import {setErrorText} from "../../redux/reducers/appReducer";
import {addTwoAlbumsRelease, clearTwoAlbumsMCArray, setFailedSearch} from "../../redux/reducers/twoAlbumsReducer";

const SearchPanel = ({print, oneAlbumMCArray, twoAlbumsMCArray, clearOneAlbumMCArray, clearTwoAlbumsMCArray, addOneAlbumRelease, addTwoAlbumsRelease, setErrorText, mode, setFailedSearch, ...props}) => {
    const [artist, setArtist] = useState('');
    const [artist1, setArtist1] = useState('');
    const [artist2, setArtist2] = useState('');
    const [album, setAlbum] = useState('');
    const [album1, setAlbum1] = useState('');
    const [album2, setAlbum2] = useState('');

    const clearInputs = () => {
        setArtist('');
        setArtist1('');
        setArtist2('');
        setAlbum('');
        setAlbum1('');
        setAlbum2('');
    }

    const search = async (e) => {
        e.preventDefault();
        if (mode === 'one') {
            searchAPI.getAlbum(artist, album).then(res => {
                if (res) {
                    if(res === 'error') {
                        setErrorText('Что-то пошло не так...')
                    } else {
                        mode === 'one' ? addOneAlbumRelease(res) : addTwoAlbumsRelease(res);
                    }
                } else {
                    setErrorText('Ничего не нашлось, проверьте имя исполнителя или попробуйте ручной режим.')
                }
            })
        } else {
            let alb1 = await searchAPI.getAlbum(artist1, album1);
            let alb2 = await searchAPI.getAlbum(artist2, album2);
            if (alb1 && alb2) {
                await addTwoAlbumsRelease(alb1, alb2);
                clearInputs();
            } else {
                if (!alb1 && alb2) {
                    setFailedSearch({firstRelease: false, secondRelease: alb2});
                    setErrorText(`${artist1} - ${album1} не найден, проверьте имя исполнителя или попробуйте ручной режим.`)
                }

                if (alb1 && !alb2) {
                    setFailedSearch({firstRelease: alb1, secondRelease: false});
                    setErrorText(`${artist2} - ${album2} не найден, проверьте имя исполнителя или попробуйте ручной режим.`)
                }

                if (!alb1 && !alb2) {
                    setFailedSearch({firstRelease: false, secondRelease: false});
                    setErrorText(`Ничего не найдено, проверьте имя исполнителя или попробуйте ручной режим.`)
                }
            }
        }
    }
    if (mode === 'one') {
        return (
            <form onSubmit={search} className="search-panel">
                <input type="text" placeholder="Исполнитель" onChange={(e) => setArtist(e.target.value)} value={artist}
                       className="inputs_input"/>
                <input type="text" placeholder="Альбом" onChange={(e) => setAlbum(e.target.value)} value={album}
                       className="inputs_input"/>
                <div className="search-buttons">
                    <button type="submit" disabled={!(artist && album)} className="btn searchBtn" onClick={search}>Найти
                    </button>
                    <button type="button" disabled={!(!!oneAlbumMCArray.length)} onClick={print}
                            className="btn printBtn">Печать
                    </button>
                    <button type="button" disabled={!(!!oneAlbumMCArray.length)} className="btn clearBtn"
                            onClick={() => clearOneAlbumMCArray()}>Очистить
                    </button>
                </div>
            </form>
        );
    } else {
        return (
            <form onSubmit={search} className="search-panel search-panel_two">
                <div className="search__side">
                    <span className="search__sideText">Сторона A:</span>
                    <input type="text" placeholder="Исполнитель" onChange={(e) => setArtist1(e.target.value)}
                           value={artist1}
                           className="inputs_input"/>
                    <input type="text" placeholder="Альбом" onChange={(e) => setAlbum1(e.target.value)} value={album1}
                           className="inputs_input"/>
                </div>
                <div className="search__side">
                    <span className="search__sideText">Сторона B:</span>
                    <input type="text" placeholder="Исполнитель" onChange={(e) => setArtist2(e.target.value)}
                           value={artist2}
                           className="inputs_input"/>
                    <input type="text" placeholder="Альбом" onChange={(e) => setAlbum2(e.target.value)} value={album2}
                           className="inputs_input"/>
                </div>
                <div className="search-buttons">
                    <button type="submit" disabled={!(artist1 && album1 && album2 && artist2)} className="btn searchBtn"
                            onClick={search}>Найти
                    </button>
                    <button type="button" disabled={!(!!twoAlbumsMCArray.length)} onClick={print}
                            className="btn printBtn">Печать
                    </button>
                    <button type="button" disabled={!(!!twoAlbumsMCArray.length)} className="btn clearBtn"
                            onClick={() => clearTwoAlbumsMCArray()}>Очистить
                    </button>
                </div>
            </form>
        )
    }
};

export default connect(state => ({
    oneAlbumMCArray: state.oneAlbum.MCArray,
    twoAlbumsMCArray: state.twoAlbums.MCArray
}), {
    clearOneAlbumMCArray,
    clearTwoAlbumsMCArray,
    addOneAlbumRelease,
    addTwoAlbumsRelease,
    setErrorText,
    setFailedSearch
})(SearchPanel);
