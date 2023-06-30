import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../redux/reducers';
import rootSaga from '../redux/sagas';
import { createBrowserHistory } from 'history'
import { createRouterMiddleware, createRouterReducer} from '@lagunovsky/redux-react-router'

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = createRouterMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        ...rootReducer,
        navigator: createRouterReducer(history)
    }),
    // connectRouter(history)(reducers),
    composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export { store, history };
