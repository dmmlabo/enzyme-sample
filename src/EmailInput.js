import React, { Component } from 'react';

class EmailInput extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          name="email"
          ref="email"
          placeholder="メールアドレス"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default EmailInput;
