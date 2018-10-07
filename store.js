import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';

export function prepareStore(initial) {

    // const createStoreWithMiddleware = applyMiddleware()(createStore);
    // return createStoreWithMiddleware(rootReducer);
    return createStore(
        rootReducer,
        initial,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

}
