// @flow
import { createStore, applyMiddleware, compose, Dispatch } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reducers, { StoreState, Action } from './reducers';

type AppDispatch = Dispatch<Action>;
type AppThunk<R> = ThunkAction<R, StoreState, void, Action>;

const middleware = applyMiddleware(thunk);
const composeEnhancer = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancer(middleware);

const store = createStore<StoreState, Action, any, any>(reducers, enhancer);

export default store;
export { AppDispatch, AppThunk, StoreState, Action };
