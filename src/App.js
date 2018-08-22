import React, { Component } from 'react';
import { Provider } from 'react-redux';

/**
 * Local Imports
 */
import logo from './logo.svg';
import './App.css';
import {Carousel} from "./components"
import createStore from "./reduxStore/store";

const store = createStore();
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
          <Carousel/>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </Provider>
    );
  }
}

export default App;
