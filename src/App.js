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
    const CAROUSEL_CONFIG = {
      containerWidth:999,  
      itemsToShow: 5,
      imageGap:3,
      imageWidth: ()=>{ 
        return Math.floor((CAROUSEL_CONFIG.containerWidth / CAROUSEL_CONFIG.itemsToShow)  - CAROUSEL_CONFIG.imageGap)
      }
    };

    return (
        <Provider store={store}>
          <div className="App">
          <Carousel options={CAROUSEL_CONFIG}/>
          </div>
        </Provider>
    );
  }
}

export default App;
