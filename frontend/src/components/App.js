import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import apiUser from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

import * as auth from '../utils/auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { Route, Switch, useHistory } from 'react-router-dom';


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltip, setInfoTooltip] = React.useState(false);

    const [isRegistered, setRegistered] = React.useState(false);
    
    //const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
    const [isPhotoPopupOpen, setPhotoPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setCurrentUser] = React.useState({name:"", about:"", avatar:""});

    const [cards, setCards] = React.useState([]);

    const [loggedIn, setLoggedIn] = React.useState(false);

    const history = useHistory();

    React.useEffect(() => {
        function handleTokenCheck(){
            if (localStorage.getItem('token')){
                const token = localStorage.getItem('token');
                // проверяем токен пользователя
                auth.checkToken(token).then((res) => {
                    //console.log(res);
                    if (res.data){
                        //console.log(res.data.email);
                        // если есть цель, добавляем её в стейт
                        //console.log(loggedIn + " 1");
                        handleLogin();
                        goToMainPage();
    
                    }
                    //console.log(loggedIn + " 3");
                }); 
            }
        }

        handleTokenCheck();

        apiUser.getInitialCards()
            .then((data) => {
                //console.log(data);
                setCards(data);
            })
            .catch((err) => {
                //console.log(err);
            });

        apiUser.getFetch()
            .then((result) => {
                setCurrentUser(result);
                //console.log(result);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, [loggedIn]);

    function goToMainPage(){
        //console.log(loggedIn + " 2");
        history.push('/');
    }

    function handleCardLike(card) {
        //console.log(card);
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        apiUser.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            
            const newCards = cards.map((c) => {
                //console.log(c._id);
                //console.log(card._id);
                return c._id === card._id ? newCard : c;
            });
            setCards(newCards);

        });
    }

    function handleRegistered(reg){
        console.log(reg);
        setRegistered(reg);
    }
    function handleDeleteCard(card) {
        //console.log(card);
        apiUser.getFetchDelete('/cards/' + card._id);
    }

    function handleInfoTooltip(e){
        setInfoTooltip(!isInfoTooltip);
    }


    function handleEditAvatarClick(e){
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
        //console.log(isEditProfilePopupOpen);
    }

    function handleEditProfileClick(e){
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick(e){
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setPhotoPopupOpen(!isPhotoPopupOpen);
    }

    /*function handleDeleteClick(e){
        setDeletePopupOpen(!isDeletePopupOpen);
    }*/

    function closeAllPopups(e) {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setPhotoPopupOpen(false);
        setInfoTooltip(false);
    }

    function handleUpdateUser(newData){
        return apiUser.getFetchPatch('/users/me', JSON.stringify({
            name: newData.name,
            about: newData.about
        }))
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(newData){
        //console.log(newData);
        return apiUser.getFetchPatch('/users/me/avatar', JSON.stringify({
            avatar: newData.avatar
        }))
            .then((userData) => {
                console.log(userData);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogin (){
        //console.log(1);
        setLoggedIn(true);
    }
    function handleLogout (){
        setLoggedIn(false);
    }

    function handleAddPlaceSubmit(newData){
        console.log(newData);
        return apiUser.getFetchPost('/cards', JSON.stringify({
            name: newData.name,
            link: newData.link
        }))
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
    }

  return (
    <>
        <CurrentUserContext.Provider value={currentUser}>
            <Header handleLogout={handleLogout}/>
            
                <Switch>

                    <ProtectedRoute exact path="/" loggedIn={loggedIn} 
                        onCardClick={handleCardClick} 
                        onEditAvatar={handleEditAvatarClick} 
                        onAddPlace={handleAddPlaceClick} 
                        onEditProfile={handleEditProfileClick}

                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCard}
                    component={Main} />

                    <Route path="/register">
                        <Register onInfoTooltip={handleInfoTooltip} onRegistered={handleRegistered} />
                    </Route>

                    <Route path="/login">
                        <Login handleLogin={handleLogin} onInfoTooltip={handleInfoTooltip} onRegistered={handleRegistered} />
                    </Route>

                    
                    {/*<Main onCardClick={handleCardClick} 
                        onEditAvatar={handleEditAvatarClick} 
                        onAddPlace={handleAddPlaceClick} 
                        onEditProfile={handleEditProfileClick}

                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCard}
                    />*/}
                    
                
                </Switch>
            
            {loggedIn && <Footer/>}


            <InfoTooltip isRegistered={isRegistered} isOpen={isInfoTooltip} onClose={closeAllPopups} ></InfoTooltip>

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

            <ImagePopup onClose={closeAllPopups} isOpen={isPhotoPopupOpen} cardInfo={selectedCard}/>
        </CurrentUserContext.Provider>
    </>
  );
}

export default App;
