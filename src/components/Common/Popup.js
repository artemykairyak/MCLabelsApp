import React from 'react'
import {errorIcon} from '../../constants'
import {connect} from 'react-redux'
import {setErrorText} from '../../redux/reducers/appReducer'

const Popup = ({type, text, setErrorText, onClick}) => {
    return (
        <div className="overlay" onClick={() => setErrorText('')}>
            <div className="popup">
                {type === 'error' && <span className="popup__icon">{errorIcon}</span>}
                <p className="popup__text">{text}</p>
                <div className="popup__buttons">
                    <button className="btn popup__closeBtn" onClick={() => setErrorText('')}>Закрыть</button>
                    <button className="btn popup__manuallyBtn" onClick={() => {
                        onClick()
                        setErrorText('')
                    }}>В ручной режим
                    </button>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {setErrorText})(Popup)
