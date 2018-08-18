// @flow
import { createStore, applyMiddleware, compose, combineReducers, Dispatch, Reducer } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import reducers, { StoreState, Action, asyncReducerName } from './reducers';

type AppDispatch = Dispatch<Action>;
type AppThunk<R> = ThunkAction<R, StoreState, void, Action>;

const middleware = applyMiddleware(thunk);
const composeEnhancer = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancer(middleware);

const store = createStore<StoreState, Action, {}, {}>(combineReducers(reducers), enhancer);

const asyncReducers: { [key: string]: Reducer<StoreState, Action> } = {};
function injectReducer(name: asyncReducerName, reducer: Reducer<any, Action>) {
  asyncReducers[name] = reducer;
  store.replaceReducer(
    combineReducers({
      ...reducers,
      ...asyncReducers,
    }),
  );
}

export default store;
export { AppDispatch, AppThunk, StoreState, Action, injectReducer };
