import React from 'react';
import trash from '../images/Trash.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);


    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    ); 
        //element__like-button_isActive_true
    //console.log(cardDeleteButtonClassName);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_isActive_true' : ''}`);

    function handleClick() {
        props.onCardClick({title: props.card.name, src: props.card.link});
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteCardClick() {
        props.onDeleteCard(props.card);
    }

    return (
        <div className="element">
            <button className="element__button-image" onClick={handleClick}>
                <img src={props.card.link} className="element__image" alt="Картинка"/>

            </button>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteCardClick} type="button">
                <img src={trash} alt="Мусорка"/>
            </button>
            <div className="element__describe">
                <h3 className="element__text">{props.card.name}</h3>
                <div className="element__like-group">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
     );
}
  
export default Card;