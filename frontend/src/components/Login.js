import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    
    if (!this.state.username || !this.state.password){
      return;
    }

    auth.authorize(this.state.username, this.state.password)
    .then((data) => {
      //console.log(data.message);
      if (!data.message){
        this.setState({email: '', password: ''} ,() => {
            this.props.handleLogin();
            this.props.history.push('/');
        })
      }else{
        this.props.onRegistered(false);
        this.props.onInfoTooltip();
      }
    })
    .catch(err => console.log(err));
    
  }
  render(){
    return(
      <div className="login">
        <p className="login__welcome">
          Вход
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          
          <input className="login__input" required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Email" />
          
          <input className="login__input" required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Пароль" />
          
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
