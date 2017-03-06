import React, { Component } from 'react';
import LoginForm from './LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="./logo.svg" className="App-logo" alt="logo" />
          <h2>EnzymeでReactコンポーネントのテストを書こう</h2>
        </div>
        <div className="App-intro">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default App;
