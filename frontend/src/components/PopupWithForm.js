import React from 'react';
import closeIcon from '../images/Close-Icon.svg';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <form className={`form form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit} noValidate>
                <button onClick={props.onClose} className="form__close-button popup__close-button" type="button">
                    <img src={closeIcon} alt="Закрыть" className="form__close-icon"/>
                </button>
                <h3 className="form__title">{props.title}</h3>
                <fieldset className="form__set">
                    {props.children}
                    <button className="form__submit" type="submit">Сохранить</button>
                </fieldset>
            </form>
      </div>
     );
}
  
export default PopupWithForm;