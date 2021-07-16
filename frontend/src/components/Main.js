import React from 'react';
import bigPen from '../images/Big.svg';
import pen from '../images/Ручка.svg';
import plus from '../images/plus.svg';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    

    const currentUser = React.useContext(CurrentUserContext);
    

    return (
        <>
            <main className="main">
                <div className="profile">
                    <div className="profile__left-items">
                        <div className="profile__avatar-container">
                            <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                            <button className="profile__avatar-cover" onClick={props.onEditAvatar}>
                                <img src={bigPen} alt="Большая ручка"/>
                            </button>
                        </div>
                        <div className="profile__info">
                            <div className="profile__text">
                                <h2 className="profile__full-name">{currentUser.name}</h2>
                                <button className="profile__edit-button" onClick={props.onEditProfile} type="button">
                                    <img src={pen} alt="Ручка"/>
                                </button>
                            </div>
                            <p className="profile__describe">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" onClick={props.onAddPlace} type="button">
                        <img src={plus} alt="Плюс"/>
                    </button>
                </div>
            
                <div className="elements">
                    {
                        props.cards.map(item => (
                            <Card
                                card = {item}
                                onCardClick={props.onCardClick}
                                //likes={item.likes} 
                                //src={item.link} 
                                //title={item.name}
                                //owner_id={item.owner._id}
                                key={item._id}
                                //card_id={item._id}
                                onCardLike={props.onCardLike}
                                onDeleteCard={props.onCardDelete}
                            />)
                        )
                    }
                </div>
            </main>
        </>
    );
}


  
export default Main;