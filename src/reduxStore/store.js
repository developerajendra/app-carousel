import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk'

/**
 * locally import
 */
import rootReducer from '../common/reducers';

const createStore = (initialState={}) => {

    const middleware = [thunk];

    //Compose redux store for dev tools.
    let composeEnhancers = compose;
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
     

    const store =  createReduxStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
    return store;
}

export default createStore;