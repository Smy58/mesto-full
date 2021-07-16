import React from 'react';
import closeIcon from '../images/Close-Icon.svg';
import okIcon from '../images/Ok.svg';
import erIcon from '../images/Er.svg';

function InfoTooltip(props) {


    return (
        <div className={`popup  ${props.isOpen ? 'popup_opened' : ''}`}>
          <div className="info-tooltip" noValidate>
                <button onClick={props.onClose} className="info-tooltip__close-button popup__close-button" type="button">
                    <img src={closeIcon} alt="Закрыть" className="info-tooltip-fullsize__close-icon"/>
                </button>
                <img src={props.isRegistered ? okIcon : erIcon} alt="Получилось!" className="info-tooltip__icon"/>
                <p className="info-tooltip__title">{props.isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </div>
     );
}
  
export default InfoTooltip;