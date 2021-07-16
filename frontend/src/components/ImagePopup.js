import React from 'react';
import closeIcon from '../images/Close-Icon.svg';

function ImagePopup(props) {


    return (
        <div className={`popup popup_type_photo-form ${props.isOpen ? 'popup_opened' : ''}`}>
          <div className="photo-fullsize" noValidate>
                <button onClick={props.onClose} className="photo-fullsize__close-button popup__close-button" type="button">
                    <img src={closeIcon} alt="Закрыть" className="photo-fullsize__close-icon"/>
                    
                </button>
                <img className="photo-fullsize__image" src={props.cardInfo.src} alt="Картина полный размер"/>
                <h3 className="photo-fullsize__describe">{props.cardInfo.title}</h3>
            </div>
        </div>
     );
}
  
export default ImagePopup;