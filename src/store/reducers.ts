// import { combineReducers } from 'redux';

interface StoreState {}

type Action = 'NO ACTION';

// const reducers = combineReducers<StoreState>({});
const reducers = (state: StoreState) => state;

export default reducers;
export { StoreState, Action };
