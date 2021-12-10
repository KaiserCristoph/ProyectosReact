import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { modelReducer } from '../reducers/modelReducer';
import { manufacturerReducer } from '../reducers/manufacturerReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    model: modelReducer,
    manufacturer: manufacturerReducer
});


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);