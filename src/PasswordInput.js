import React, { Component } from 'react';

class PasswordInput extends Component {
  render() {
    return (
      <div>
        <input
          type="password"
          name="password"
          ref="password"
          placeholder="パスワード"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default PasswordInput;
