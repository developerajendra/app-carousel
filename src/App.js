import React, { Component } from 'react';
import { Provider } from 'react-redux';

/**
 * Local Imports
 */
import {Carousel} from "./components"
import createStore from "./reduxStore/store";
import {CAROUSEL_CONFIG} from "./constants/carousel.costant"

const store = createStore();

class App extends Component {
  render() {
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
