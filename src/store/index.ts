// @flow
import { createStore, applyMiddleware, compose, Dispatch } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reducers, { StoreState } from './reducers';

type AppDispatch = Dispatch<StoreState>;
type AppThunk<R> = ThunkAction<R, StoreState, void>;

const middleware = applyMiddleware(thunk);
const composeEnhancer = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(middleware);

const store = createStore<StoreState>(reducers, enhancer);

export default store;
export { AppDispatch, AppThunk, StoreState };
