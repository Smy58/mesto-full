import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){

  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log('try');
    auth.register(this.state.password, this.state.email).then((res) => {
      console.log(res);
      if(!res.error){
        this.props.history.push('/login');
        this.props.onRegistered(true);
      }else{
        
        this.props.onRegistered(false);
      }
      this.props.onInfoTooltip();
    });
  }
  
  render(){
    return (
      <div className="register">
        <p className="register__welcome">
            Регистрация
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          
          <input placeholder="Email" className="register__input" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          
          <input placeholder="Пароль" className="register__input" id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          
          <div className="register__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться</button>
          </div>
        </form>
        
        <div className="register__signin">
          <p>Уже зарегистрированы? <Link to="login" className="register__login-link">Войти</Link> </p>
        </div>
    </div>
  );
  }

}

export default withRouter(Register);
