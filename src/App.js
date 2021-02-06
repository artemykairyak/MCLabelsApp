import './App.css';
import React, {useEffect, useState} from "react";
import {cdIcon, handIcon} from "./constants";
import OneAlbum from "./components/Panels/OneAlbum";
import {connect} from "react-redux";
import Popup from "./components/Common/Popup";
import TwoAlbums from "./components/Panels/TwoAlbums";
import Manually from "./components/Panels/Manually";

const App = ({errorText, state}) => {
    let [printing, setPrinting] = useState(false);
    const [mode, setMode] = useState('');

    useEffect(() => {
        console.log(state)
    }, [state]);

    const print = async () => {
        await setPrinting(true);
        await window.print();
        await setPrinting(false);
    }

    return (
        <>
            <div className="main">
                {!mode ? <div className="mode-wrapper">
                        <div className="mode-table">
                            <div className="mode mode_onealbum" onClick={() => setMode('one')}>
                                {cdIcon}
                                <span className="mode__title">Один альбом</span>
                            </div>
                            <div className="mode mode_twoalbums" onClick={() => setMode('two')}>
                                {cdIcon}
                                {cdIcon}
                                <span className="mode__title">Два альбома</span>
                            </div>
                            <div className="mode mode_hand" onClick={() => setMode('manually')}>
                                {handIcon}
                                <span className="mode__title">Вручную</span>
                            </div>
                        </div>
                    </div> :
                    <>
                        {mode === 'one' && <OneAlbum printing={printing} print={print} mode={mode}/>}
                        {mode === 'two' && <TwoAlbums printing={printing} print={print} mode={mode}/>}
                        {mode === 'manually' && <Manually printing={printing} print={print} mode={mode}/>}
                    </>}
            </div>
            {!!(mode && !printing) && <button className="btn backBtn" onClick={() => setMode('')}>Назад</button>}
            {errorText && <Popup type="error" text={errorText} onClick={() => setMode('manually')}/>}
        </>
    );
}

export default connect(state => ({state: state, errorText: state.app.errorText}), {})(App);
