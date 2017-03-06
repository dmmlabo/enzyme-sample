import React, { Component } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.validate()) {
      alert('ログインしました');
      return true;
    }

    return false;
  }

  setErrorMessage(name) {
    const errorMessage = {
      email: 'メールアドレスが入力されていません',
      password: 'パスワードが入力されていません',
      common: 'メールアドレス・パスワードが入力されていません'
    };

    this.setState({
      message: errorMessage[name],
    });
  }

  validate(event) {

    let canSubmit = true;

    for(const name in this.refs) {
      if(this.refs[name].refs[name].value === '') {
        if(!canSubmit) {
          this.setErrorMessage('common');
          canSubmit = false;
        } else {
          this.setErrorMessage(name);
          canSubmit = false;
        }
      }
    }

    return canSubmit;
  }

  render() {
    return (
      <form action="/" method="post" onSubmit={this.handleSubmit}>
        <EmailInput
          ref="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <PasswordInput
          ref="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <div className="App-info">
          {this.state.message}
        </div>
        <div>
          <input type="submit" value="ログイン" />
        </div>
      </form>
    );
  }
}

export default LoginForm;
