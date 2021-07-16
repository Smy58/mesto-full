import React from 'react';
import headerLogo from '../images/logo.svg';

import { Link, Switch, Route, useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  function signOut(){

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    props.handleLogout();
    history.push('/login');
  }

  return (
    <header className="header">
        <img src={headerLogo} alt="Логотип" className="logo"/>
        <div className="header__menu">
          <Switch>
            <Route path="/login">
              <Link to="register" className="header__link">Регистрация</Link>  
            </Route>
            <Route path="/register">
              <Link to="login" className="header__link">Войти</Link>  
            </Route>
            <Route path="/">
              <div className="header__block">
                <p className="header__link">{localStorage.getItem('email')}</p>
                <button onClick={signOut} className="header__link header__button">Выйти</button>
              </div>
            </Route>
          </Switch>
          
        </div>
    </header>
  );
}
  
export default Header;